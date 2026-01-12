const Contact = () => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="border p-2 rounded"
        />
        <button className="bg-red-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
