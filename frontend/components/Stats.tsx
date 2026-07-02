"use client";

import { Building2, GraduationCap, Wallet, Activity } from "lucide-react";

const stats = [
  {
    icon: Building2,
    number: "500+",
    title: "Schools"
  },
  {
    icon: GraduationCap,
    number: "100K+",
    title: "Students"
  },
  {
    icon: Wallet,
    number: "UGX 20B+",
    title: "Payments"
  },
  {
    icon: Activity,
    number: "99.9%",
    title: "Uptime"
  }
];

export default function Stats(){

return(

<section className="bg-white py-16">

<div className="mx-auto max-w-7xl px-6">

<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

{stats.map((item)=>{

const Icon=item.icon;

return(

<div
key={item.title}
className="rounded-2xl border p-8 text-center shadow-sm hover:shadow-xl transition"
>

<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">

<Icon className="text-indigo-600"/>

</div>

<h2 className="mt-5 text-4xl font-black">
{item.number}
</h2>

<p className="mt-2 text-slate-500">
{item.title}
</p>

</div>

)

})}

</div>

</div>

</section>

)

}