This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Checkout detailed document on [ChatQL](https://sharp-halloumi-b84.notion.site/ChatQL-fb62b3a457634aa692653669c0ecbb9e) 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Once you clone the repo , create a “.env” file and paste the below code and add your credentials.
```bash
//Google Console Project Credentials
GOOGLE_ID=<Your Project Id>
GOOGLE_SECRET=<Your Project Secret>

DATABASE_URL=<Your Postgress Database URL>
NEXTAUTH_SECRET=<"openssl rand -base64 32" Run this command in your terminal and paste it>

NEXTAUTH_URL=http://localhost:3000

//Pusher Credentials
PUSHER_ID = <Your PusherJS Project ID>
NEXT_PUBLIC_PUSHER_APP_KEY = <Your PusherJS Project Public key>
PUSHER_APP_SECRET = <Your PusherJS Project Secret>
cluster = "ap2"

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
