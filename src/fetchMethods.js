"use server";

import Cinema from "../model/cinema";
import Booking from "../model/booking";
import connectDb from "../middleware/connect";
import Customer from "../model/customer";
import bcrypt from "bcrypt";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// import Stripe from "stripe"

export const now_playing = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
};

export const popular = async () => {
  const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
};

export const getMovie = async (movie_id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.TMDB_API_KEY}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
};

export const getCinema = async (cinema) => {
  connectDb();
  // console.log({cinema});
  let data = await Cinema.findOne({ name: cinema });

  if (!data) {
    data = await Cinema.findOne({ _id: cinema });
  }

  // console.log(data);
  return data;
};

export const createSeats = async (cinema, movieId, time) => {
  connectDb();

  let Seats = await Booking.find({ cinema: cinema._id, movieId, time });
  // console.log(Seats)
  if (Seats.length !== 0) {
    return Seats;
  }

  let seatLetter = "A";
  let rows = 3;
  let seatNumber = 1;

  for (let i = 1; i <= cinema.totalSeat; i++) {
    Seats = await new Booking({
      seatId: seatLetter + seatNumber,
      isBooked: false,
      cinema: cinema._id,
      isVip: i > cinema.totalSeat - cinema.cols * rows,
      price: i > cinema.totalSeat - cinema.cols * rows ? 50 : 34,
      movieId: movieId,
      time,
    });
    seatNumber++;
    // After every 8 seats, change the seat letter
    // console.log(i % cinemaDetails[0].row);
    if (seatNumber > cinema.cols) {
      seatLetter = String.fromCharCode(seatLetter.charCodeAt(0) + 1);
      seatNumber = 1;
    }
    await Seats.save();
  }
  Seats = await Booking.find({ cinema: cinema._id, movieId, time });

  return Seats;
};

export const bookSeat = async (seatId, customerID, time) => {
  connectDb();

  // console.log({"cinema":cinemaId,"movieId":movieId,"seatArr":seatId,'customer':customerId});
  console.log({ customerID, seatId, time });
  //  seatArr.map(async (seat)=>{
  // console.log(seat)
  const data = await Booking.findOneAndUpdate(
    {
      // cinemaId,
      // movieId,
      _id: seatId,
    },
    {
      isBooked: true,
      customer: customerID,
      time,
    }
  );
  // })
  // return data
  // console.log(data);
};

export const CreateUser = async (name, email, password) => {
  connectDb();

  console.log({ name, email, password });

  if (name == "" || email == "" || password == "") {
    console.log(true);
    return { success: false, msg: "Enter correct credential" };
  }

  let data = await Customer.findOne({ email });
  console.log(data);

  if (data) {
    return { success: false, msg: "This user already exist" };
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);

  data = await Customer.create({
    name,
    email,
    password: secPass,
  });
  return {
    success: true,
    data: { id: data._id, name: data.name, email: data.email },
  };

  // })
};

export const LoginUser = async (email, password) => {
  connectDb();
  // console.log(password);

  let data = await Customer.findOne({ email });

  if (!data) {
    return { success: false, mgs: "Enter valid credentials" };
  }

  const passwordCompare = await bcrypt.compare(password, data.password);

  if (!passwordCompare) {
    return { success: false, mgs: "Enter valid credentials" };
  }

  return {
    success: true,
    data: { id: data._id, name: data.name, email: data.email },
  };
};

export const stripePayment = async (movie, seats, time,userId) => {
  console.log(userId);
  
  // console.log({movie,seats});

  if (movie && seats.length !== 0) {
    const customer = await stripe.customers.create({
      metadata: {
        customerID: seats.user,
        seatDetail: JSON.stringify(
          seats.map((seat) => {
            // console.log("payment", seat);
            return JSON.stringify({
              userId,
              seatId: seat.id,
              time,
            });
          })
        ),
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: seats.map((seat) => {
        return {
          price_data: {
            currency: "aed",

            product_data: {
              images: [`https://image.tmdb.org/t/p/original${movie.movieImg}`],
              name: `${movie.movieTitle}_${seat.seat}`,
              description: `Time: ${time}`,
            },
            unit_amount: seat.price * 100,
          },

          quantity: 1,
        };
      }),
      mode: "payment",
      success_url: `http://localhost:3000/profile`,
      cancel_url: `http://localhost:3000/`,
    });
    // bookingSeats.map(seat=>{
    //    bookSeat(seats[0].cinema,seats[0].movieId,seat.id,user.id)
    // })

    return session.url;
  }
};

export const getBooking = async (customerId) => {
  connectDb();

  if (!customerId) {
    return;
  }

  const data = await Booking.find({
    customer: customerId,
  });

  const transformedData = [];

  const groupedData = {};

  data.forEach((item) => {
    const key = `${item.movieId}-${item.cinema}-${item.time}`;
    if (!groupedData[key]) {
      groupedData[key] = {
        movieId: item.movieId,
        cinema: item.cinema,
        time: item.time,
        seats: [item.seatId],
      };
    } else {
      groupedData[key].seats.push(item.seatId);
    }
  });

  for (const key in groupedData) {
    transformedData.push({
      movieId: groupedData[key].movieId,
      cinemaId: groupedData[key].cinema,
      time: groupedData[key].time,
      seats: groupedData[key].seats,
    });
  }

  // console.log(transformedData);

  async function getMovieAndCinemaDetails(movieId, cinemaId) {
    // Assume you have a getMovie function that fetches movie details based on movieId
    try {
      const movie = await getMovie(movieId);
      const cinema = await getCinema(cinemaId);
      return { movie, cinema };
    } catch (error) {
      console.error(
        `Error fetching movie details for movieId: ${movieId}`,
        error
      );
      return null;
    }
  }

  const movieDetails = [];

  for (const movie of transformedData) {
    try {
      const movieId = movie.movieId;
      const movieDetailsResponse = await getMovieAndCinemaDetails(
        movie.movieId,
        movie.cinemaId
      );
      // console.log({ movieDetailsResponse });
      const movieDetail = {
        movieId: movieId,
        cinema: movieDetailsResponse ? movieDetailsResponse.cinema.name : "N/A",
        movieTitle: movieDetailsResponse
          ? movieDetailsResponse.movie.original_title
          : "N/A",
        moviePoster: movieDetailsResponse
          ? movieDetailsResponse.movie.poster_path
          : // ? movieDetailsResponse. backdrop_path
            "N/A",
        seats: movie.seats,
        email: movie.email,
        time: movie.time,
      };
      movieDetails.push(movieDetail);
    } catch (error) {
      console.error(
        `Error fetching movie details for movieId: ${movie.movieId}`,
        error
      );
    }
  }

  // console.log(movieDetails);

  return movieDetails;
};

