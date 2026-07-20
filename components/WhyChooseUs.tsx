import {
  FaTruckFast,
  FaShieldHeart,
  FaHeadset,
  FaMedal,
} from "react-icons/fa6";

const features = [
  {
    icon: FaTruckFast,
    title: "Fast Shipping",
    description:
      "Quick and reliable delivery so your gear reaches you on time.",
  },
  {
    icon: FaShieldHeart,
    title: "Secure Payments",
    description:
      "Your payments are protected with safe and trusted checkout.",
  },
  {
    icon: FaMedal,
    title: "Premium Quality",
    description:
      "Carefully selected products built for performance and durability.",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description:
      "Our team is always ready to help whenever you need assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">
            Why Choose Us
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Shop With Confidence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We&apos;re committed to providing high-quality sports gear with secure
            shopping and excellent customer service.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-2xl text-yellow-600 transition group-hover:bg-yellow-600 group-hover:text-white">
                  <Icon />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}