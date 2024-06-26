"use client";
import RecentCourse from "@/components/RecentCourse";
import MyClass from "@/components/myClass";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch(`http://localhost:5000/g`, {
      mode: "no-cors",
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="pb-14 lg:pr-20">
      <MyClass />
      <RecentCourse />

      <div></div>
    </main>
  );
}
