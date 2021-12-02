import React from "react";
import { useState, useEffect, Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList.js";
import { MongoClient } from "mongodb";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  // const [loadedMeetups, setloadedMeetups] = useState([]);
  // useEffect(() => {
  //   setloadedMeetups(DUMMY_MEETUPS)
  // }, [])
  return (
    <Fragment>
      <Head>
        <title>Next.js MeetUp</title>
        <meta name="description" content="This is the index page for the next js meetup page"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
export async function getStaticProps() {
  //any server side code

  const client = await MongoClient.connect(
    "mongodb+srv://venkat:5Rb75UZTXrfXumm@cluster0.i6tjm.mongodb.net/meetupdb?retryWrites=true&w=majority"
  );

  //creates a new db if db doest exists, and if no value is passed it uses db in the connection string
  const db = client.db();

  //creates a new collection if collection does'nt exists
  const collection = db.collection("meetups");

  const meetups = await collection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(){
//   return {
//     props:{
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage;
