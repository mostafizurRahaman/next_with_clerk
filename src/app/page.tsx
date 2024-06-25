"use client";
import RecentCourse from "@/components/RecentCourse";
import MyClass from "@/components/myClass";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch(`http://localhost:5000/g`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => console.log(res));
  }, []);
  return (
    <main className="pb-14 lg:pr-20">
      <MyClass />
      <RecentCourse />

      <div></div>
    </main>
  );
}
