"use client";
import React, { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image, { ImageLoader } from "next/image";
import { useRouter } from "next/navigation";
import { StaticImport, PlaceholderValue, OnLoadingComplete } from "next/dist/shared/lib/get-img-props";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // フォーム送信時の処理
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // パスワードの一致確認
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // APIリクエストなどの処理をここに追加
    // APIリクエストの処理
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  return (
    <Card
      key="1"
      className="mx-auto mt-10 w-96 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <CardHeader className="p-6 flex items-center space-x-4">
        <DogIcon className="w-8 h-8" />
        <div className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-700">
            Register
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Please fill in your details
          </CardDescription>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700" htmlFor="email">
              Email
            </Label>
            <Input
              className="border border-gray-300 rounded w-full p-2"
              id="username"
              placeholder="m@example.com"
              required
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700" htmlFor="password">
              Password
            </Label>
            <Input
              className="border border-gray-300 rounded w-full p-2"
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              className="border border-gray-300 rounded w-full p-2"
              id="confirmPassword"
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-gray-50 flex items-center justify-between">
          <Button
            className="bg-blue-500 text-white rounded px-4 py-2"
            type="submit"
          >
            Sign up
          </Button>
          <Link className="text-blue-500 hover:text-blue-600" href="/login">
            Already have an account?
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}

function DogIcon(props: any) {
  return (
    <Image
      src="/オムそば丼キャラ切り抜き.png"
      width="100"
      height="100"
      {...props}
    />
  );
}
