import React, { Fragment } from "react";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from 'next/head';

function NewMeetUp() {
  const router = useRouter();
  async function addMeetupHandler(meetup) {
    const resposne = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetup),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resposne.json();

    console.log(data);

    router.replace("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add MeetUp</title>
        <meta
          name="description"
          content="Adding a new MeetUp"
        />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetUp;
