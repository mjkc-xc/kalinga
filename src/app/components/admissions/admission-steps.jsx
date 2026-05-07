"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import GlobalArrowButton from "../general/global-arrow_button";
import SectionHeading from "../general/SectionHeading";
import { useRef, useEffect } from "react";


const stepData = [
  {
    title: "Step 1",
    description: "Visit Website",
    backDescription: "hello",
  },
  {
    title: "Step 2",
    description: "Register for the entrance exam",
    backDescription: "hello 2",
  },
  {
    title: "Step 3",
    description: "Take the computer-based exam and get shortlisted",
    backDescription: "hello 3",
  },
  {
    title: "Step 4",
    description: "Offer letter",
    backDescription: "hello 4",
  },
  {
    title: "Step 5",
    description: "Admission letter",
    backDescription: "hello 5",
  },
];

const admissionSteps = stepData.map((step, index) => ({
  id: index + 1,
  stepNumber: String(index + 1).padStart(2, "0"),
  title: step.title,
  description: step.description,
  backDescription: step.backDescription ?? step.description,
  image: "https://cdn.kalingauniversity.ac.in/common/step1.png",
}));

export default function AdmissionSteps({
  steps = admissionSteps,
  subtitle = "Admission Procedure",
  title = "Steps To Get Admission Into KU",
  showHeaderButton = true,
  ctaLabel = "Enquiry Now",
  onCtaClick,
  ctaHref = "/admissions",
  showReadMore = true,
  showIcon = true,
  showImage = true,
  bgColor = "bg-[var(--light-gray)]",
  itemsAlignment = "end",
  firstCardScrollTarget = null,
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const handleFirstCardClick = () => {
    if (firstCardScrollTarget) {
      const targetElement = document.getElementById(firstCardScrollTarget);
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const bindNavigation = (swiperInstance) => {
    if (!swiperInstance || !prevRef.current || !nextRef.current) return;
    
    // Ensure navigation params exist
    if (!swiperInstance.params.navigation) {
      swiperInstance.params.navigation = {};
    }
    
    swiperInstance.params.navigation.prevEl = prevRef.current;
    swiperInstance.params.navigation.nextEl = nextRef.current;
    
    if (swiperInstance.navigation) {
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  };

  // Re-bind navigation once refs are mounted and when steps change
  useEffect(() => {
    bindNavigation(swiperRef.current);
  }, [steps]);

  return (
    <section className={`py-16 ${bgColor}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .admission-steps-swiper .swiper-slide .step-card-inner {
          color: white;
        }
        // .admission-steps-swiper .swiper-slide .step-number {
        //   color: var(--lite-sand);
        //   opacity: 0.2;
        // }
        .admission-steps-swiper .flip-face.back .step-number {
          color: var(--light-text-gray);
          opacity: 0.3;
        }
        .admission-steps-swiper .swiper-slide .step-title {
          color: white;
        }
        .admission-steps-swiper .swiper-slide .step-description {
          color: white;
        }
        .admission-steps-swiper .step-button-icon {
          stroke : var(--foreground);
        }
        .admission-steps-swiper .card-wrapper.hoverable {
          perspective: 1200px;
        }
        .admission-steps-swiper .card-wrapper.hoverable .flip-inner {
          transform-style: preserve-3d;
          transition: transform 0.6s;
          position: relative;
          height: 100%;
        }
        .admission-steps-swiper .card-wrapper.hoverable:hover .flip-inner {
          transform: rotateY(180deg);
        }
        .admission-steps-swiper .flip-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .admission-steps-swiper .flip-face.back a {
          position: relative !important;
          z-index: 9999 !important;
          pointer-events: auto !important;
          cursor: pointer !important;
          display: inline !important;
        }
        .admission-steps-swiper .flip-face.back a:active,
        .admission-steps-swiper .flip-face.back a:focus {
          z-index: 9999 !important;
          pointer-events: auto !important;
          outline: none;
        }
        .admission-steps-swiper .flip-face.back {
          transform: rotateY(180deg);
          pointer-events: auto;
        }
        .admission-steps-swiper .flip-face.back .step-card-inner {
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: auto;
        }
        .admission-steps-swiper .step-card-inner::-webkit-scrollbar {
          width: 6px;
        }
        .admission-steps-swiper .step-card-inner::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .admission-steps-swiper .step-card-inner::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        .admission-steps-swiper .step-card-inner::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.5);
        }
      `}} />
      <div className="container mx-auto px-2">
        {/* Header Section */}
        <div className={`flex flex-col md:flex-row md:items-center ${showHeaderButton ? "justify-between" : "justify-center"} mb-8 md:mb-12 gap-4`}>
          <div >
            <SectionHeading
              subtitle={subtitle}
              title={title}
              subtitleClassName={`${showHeaderButton ? "" : "hidden"}`}
              titleClassName={` text-[var(--button-red)] ${showHeaderButton ? "text-left" : "text-center"}`}
            />
          </div>
          {showHeaderButton && (
            <div className="flex-shrink-0">
              {onCtaClick ? (
                <GlobalArrowButton onClick={onCtaClick} variant="white">
                  {ctaLabel}
                </GlobalArrowButton>
              ) : (
                <Link href={ctaHref} className="inline-flex">
                  <GlobalArrowButton variant="white">
                    {ctaLabel}
                  </GlobalArrowButton>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Steps Slider - Edge to Edge */}
      <div className="relative pl-0 md:pl-[50px]">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={"auto"}
          slidesPerGroup={1}
          grabCursor={true}
          loop={false}
          breakpoints={{
            640: {
              spaceBetween: 24,
            },
            768: {
              spaceBetween: 28,
            },
            1024: {
              spaceBetween: 32,
            },
            1280: {
              spaceBetween: 36,
            },
          }}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Delay binding to ensure button refs are set
            setTimeout(() => bindNavigation(swiper), 0);
          }}
          className="admission-steps-swiper !pb-8 !px-3 md:!px-5 [&_.swiper-wrapper]:!flex [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto [&_.swiper-slide]:!w-auto"
          autoHeight={true}
        >
          {steps.map((step, index) => (
            <SwiperSlide key={step.id} className="!h-auto !w-auto">
              <div className="relative h-full flex">
                {/* Connecting Line - Between cards */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-[24px] w-[24px] border-t border-dashed border-gray-400 transform -translate-y-1/2 z-20 pointer-events-none"></div>
                )}

                {/* Step Card */}
                <div
                  className={`card-wrapper w-[320px] md:w-[360px] min-h-[180px] md:min-h-[200px] max-h-[400px] flex flex-col ${showReadMore ? "hoverable" : ""} ${index === 0 && firstCardScrollTarget ? "cursor-pointer" : ""}`}
                  style={{ pointerEvents: 'auto' }}
                  onClick={index === 0 && firstCardScrollTarget ? handleFirstCardClick : undefined}
                >
                  <div className="flip-inner h-full" style={{ pointerEvents: 'auto' }}>
                    {/* Front Face */}
                    <div className="flip-face front bg-white rounded-xl p-1 h-full flex flex-col">
                      <div className="step-card-inner h-full flex flex-col rounded-xl relative overflow-hidden bg-[var(--button-red)] text-white p-4">
                        {/* Background Number */}
                        <div
                          className="step-number absolute top-4 right-4 text-7xl md:text-8xl leading-none opacity-20 font-stix text-[#fe9999]"
                          style={{
                            WebkitTextStroke: '1px #fe9999',
                            textStroke: '1px #fe9999',
                            color: 'transparent'
                          }}
                        >
                          {step.stepNumber}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Icon and Text Row */}
                          <div className={`flex gap-4 flex-1 pt-4 ${itemsAlignment === "center" ? "items-center" : "items-end"}`}>
                            {/* Icon Image */}
                            {showIcon && (
                              <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center text-[var(--button-red)] flex-shrink-0">
                                {step.icon ? (
                                  typeof step.icon === 'string' ? (
                                    <Image
                                      src={step.icon}
                                      alt={step.title || "Step icon"}
                                      width={56}
                                      height={56}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    step.icon
                                  )
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="h-10 w-10"
                                    fill="currentColor"
                                  >
                                    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5zM6.5 6.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" />
                                    <path d="M9 8.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 9 8.75M9 12a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 9 12" />
                                  </svg>
                                )}
                              </div>
                            )}

                            {/* Title and Description */}
                            <div className="flex-1 min-w-0">
                              {/* Title */}
                              <h4 className="step-title text-lg md:text-xl mb-1 font-plus-jakarta-sans">
                                {step.title}
                              </h4>

                              {/* Description */}
                              <p className="step-description text-sm md:text-base break-words overflow-wrap-anywhere">
                                {step.description}
                              </p>
                            </div>
                          </div>

                          {/* Button - Separate div with justify-end */}
                          {showReadMore && (
                            <div className="flex justify-end">
                              <button className="step-button w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-md bg-white">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="step-button-icon"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M7 17L17 7" />
                                  <path d="M7 7h10v10" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="flip-face back bg-white rounded-xl p-1 h-full flex flex-col" style={{ pointerEvents: 'auto' }}>
                      <div className="step-card-inner h-full flex flex-col rounded-xl relative bg-[var(--lite-sand)] p-4" style={{ pointerEvents: 'auto' }}>
                        {/* Background Number */}
                        <div className="step-number absolute top-4 right-4 text-7xl md:text-8xl font-bold leading-none font-stix text-gray-400 pointer-events-none z-0">
                          {step.stepNumber}
                        </div>
                        <div className={`relative z-10 flex flex-col h-full ${step.id === 5 ? 'items-start justify-center' : 'items-center justify-center'} gap-3 py-2 min-h-0`}>
                          <div className={`${step.id === 5 ? 'text-xs md:text-sm text-left' : 'text-sm md:text-base text-center'} text-[var(--text-gray-card)] break-words overflow-wrap-anywhere leading-relaxed whitespace-pre-line w-full`} style={{ position: 'relative', zIndex: 20 }}>
                            {step.backDescription ?? step.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Navigation Buttons */}
      <div className="container mx-auto px-2">
        <div className={`flex  justify-end gap-3 mt-4`}>
          <button
            ref={prevRef}
            className="admission-steps-button-prev w-12 h-12 rounded-lg bg-[var(--button-red)] hover:bg-[#A2A2A2] flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white hover:text-[var(--button-red)] transition-colors"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            ref={nextRef}
            className="admission-steps-button-next w-12 h-12 rounded-lg bg-[var(--button-red)] hover:bg-[#A2A2A2] flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white hover:text-[var(--button-red)] transition-colors"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

