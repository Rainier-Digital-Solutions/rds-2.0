import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Cta from "@layouts/components/Cta";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";
import YoutubePlayer from "@layouts/components/YoutubePlayer";

const Home = ({ frontmatter }) => {
  const { banner, feature, services, video, workflow, call_to_action } = frontmatter;
  const { title } = config.site;

  return (
    <Base title={title}>
      {/* Banner */}
      <section className="section pb-[50px]">
        <div className="container">
          <div className="text-center row">
            <div className="mx-auto lg:col-12">
              <h1 className="mx-auto font-bold text-left sm:text-center font-primary">{banner.heading}</h1>
              <p className="max-w-3xl mx-auto mt-4 text-xl text-left sm:text-center">{markdownify(banner.subheading)}</p>
              <p className="max-w-xl mx-auto mt-4 text-lg text-left sm:text-center">{markdownify(banner.subheading2)}</p>
              {banner.button.enable && (
                <Link
                  className="mt-4 btn btn-primary"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
              <Image
                className="mx-auto mt-12"
                src={banner.image}
                width={750}
                height={390}
                alt="Rainier Digital Solutions creates quality websites"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-theme-light/20">
        <div className="container">
          <div className="text-center">
            <h2>{markdownify(feature.title)}</h2>
          </div>
          <div className="grid mt-8 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {feature.features.map((item, i) => (
              <div
                className="p-5 pb-8 text-center bg-white feature-card rounded-xl"
                key={`feature-${i}`}
              >
                {item.icon && (
                  <Image
                    className="mx-auto"
                    src={item.icon}
                    width={48}
                    height={48}
                    alt={item.name}
                  />
                )}
                <div className="mt-4">
                  {markdownify(item.name, "h3", "h5")}
                  <p className="mt-3">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
      {services.map((service, index) => {
        const isOdd = index % 2 > 0;
        return (
          <section
            key={`service-${index}`}
            className={`section ${isOdd && "bg-theme-light/20"}`}
          >
            <div className="container">
              <div className="items-center gap-8 md:grid md:grid-cols-2">
                {/* Carousel */}
                <div className={`service-carousel ${!isOdd && "md:order-2"}`}>
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    pagination={
                      service.images.length > 1 ? { clickable: true } : false
                    }
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    init={service?.images > 1 ? false : true}
                  >
                    {/* Slides */}
                    {service?.images.map((slide, index) => (
                      <SwiperSlide key={index} className="mb-2">
                        <Image src={slide.url} alt={slide.alt} width={600} height={500} loading="lazy" className="rounded-md" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Content */}
                <div
                  className={`service-content mt-5 md:mt-0 ${!isOdd && "md:order-1"
                    }`}
                >
                  <h2 className="font-bold leading-[40px]">{service?.title}</h2>
                  <p className="mt-4 mb-2">{service?.content}</p>
                  {service.button.enable && (
                    <Link
                      href={service?.button.link}
                      className="inline-flex items-center font-bold cta-link"
                    >
                      {service?.button.label}
                      <Image
                        className="ml-1 rounded-md"
                        src="/images/arrow-right.svg"
                        width={18}
                        height={14}
                        alt="arrow"
                        loading="lazy"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* youtube */}
      {video && (
        <div className="mx-auto mt-8 max-w-screen-2xl">
          <YoutubePlayer
            id={video.video_id}
            title={video.title}
            loading={video.loading}
            alt={video.description}
            poster="default"
            className=""
          />
        </div>
      )}
      {/* workflow */}
      {workflow && (
        <section className="pb-0 section">
          <div className="mb-8 text-center">
            {markdownify(
              workflow.title,
              "h2",
              "mx-auto max-w-[600px] font-bold leading-[44px]"
            )}
            {markdownify(workflow.description, "p", "mt-3")}
          </div>
          <Image
            src={workflow.image}
            alt="workflow image"
            width={1920}
            height={296}
          />
        </section>
      )}

      {/* Cta */}
      <Cta cta={call_to_action} />
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
