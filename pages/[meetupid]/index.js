import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from 'react';
import Head from 'next/head';

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  //getting all ids

  const client = await MongoClient.connect(
    "mongodb+srv://venkat:5Rb75UZTXrfXumm@cluster0.i6tjm.mongodb.net/meetupdb?retryWrites=true&w=majority"
  );

  //creates a new db if db doest exists, and if no value is passed it uses db in the connection string
  const db = client.db();

  //creates a new collection if collection does'nt exists
  const collection = db.collection("meetups");

  const meetups = await collection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupid: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupid;

  //get the meetup from the db

  const client = await MongoClient.connect(
    "mongodb+srv://venkat:5Rb75UZTXrfXumm@cluster0.i6tjm.mongodb.net/meetupdb?retryWrites=true&w=majority"
  );

  //creates a new db if db doest exists, and if no value is passed it uses db in the connection string
  const db = client.db();

  //creates a new collection if collection does'nt exists
  const collection = db.collection("meetups");

  const selectedMeetup = await collection.findOne({ _id: ObjectId(meetupId) });

  console.log(selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
