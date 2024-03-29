import "../globals.css";

export const metadata = {
  title: "ATFS - Auth",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen py-10 flex flex-col items-center justify-center">
          <div className="mb-4 text-2xl font-bold">ATFS</div>
          {children}
        </div>
      </body>
    </html>
  );
}
