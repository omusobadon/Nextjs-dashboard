/* eslint-disable react/jsx-key */
"use client";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import GetAPI from "@/lib/api_get";
import PutAPI from "@/lib/api_put";
import { group } from "console";

export function CreatePrice({ groups }) {
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    tax: "",
    remark: "",
    product_id: "",
  });

  const test = () => {
    console.log(
      "test",
      groups.map((group) => group.product)
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
          variant="outline"
        >
          料金を作成
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>料金を作成</DialogTitle>
        </DialogHeader>
        <Select>
          <SelectTrigger>
            <Label>商品名</Label>
            {groups.map((group) => (
              <SelectContent>
                {group.product &&
                  Array.isArray(group.product) &&
                  group.product.map((product) => (
                    <SelectItem value={product.id}>{product.name}</SelectItem>
                  ))}
              </SelectContent>
            ))}
          </SelectTrigger>
        </Select>
        <Label>料金名</Label>
        <Input type="text" name="name" placeholder="料金名" />
        <Button onClick={test}>Test</Button>
      </DialogContent>
    </Dialog>
  );
}
