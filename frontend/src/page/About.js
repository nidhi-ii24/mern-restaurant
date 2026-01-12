const About = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Our Restaurant</h1>
      <p className="text-slate-600">
        Our restaurant application is built using the MERN stack.
        It allows customers to browse food items, add them to cart,
        and generate bills based on quantity selected.
      </p>
      <p className="mt-3 text-slate-600">
        The system also supports owner and customer login, menu management,
        and real-time cart updates.
      </p>
    </div>
  );
};

export default About;
