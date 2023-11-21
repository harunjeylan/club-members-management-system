"use client";
function SubscribeForm() {
  return (
    <form className="w-full flex flex-col gap-4">
      <input type="email" placeholder="example@domain" className="input py-3" />
      <button className="btn-primary py-2">Subscribe</button>
    </form>
  );
}

export default SubscribeForm;
