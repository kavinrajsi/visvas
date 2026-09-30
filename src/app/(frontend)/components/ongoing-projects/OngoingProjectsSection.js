"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./OngoingProjectsSection.module.scss";

// Pin coordinates are percentages of the map stage (1440x720 design band,
// i.e. the 900px home frame minus the 180px heading band).
const PROJECTS = [
  {
    id: "ajita",
    name: "Ajita",
    location: "Thuvariman, Madurai",
    title: "Ajita - 4 BHK Villa",
    badge: "ON SALE",
    badgeType: "on-sale",
    photo: "/ongoing-projects/photo-ajita.jpg",
    pin: { left: "67.15%", top: "12.78%" },
  },
  {
    id: "vasudhara",
    name: "Vasudhara",
    location: "Madurai",
    title: "Vasudhara - Apartment and Villa",
    badge: "UNDER CONSTRUCTION",
    badgeType: "under-construction",
    photo: "/ongoing-projects/photo-vasudhara.jpg",
    pin: { left: "90%", top: "19.31%" },
  },
  {
    id: "vajra",
    name: "Vajra",
    location: "Byepass Road, Madurai",
    title: "Vajra - Apartment",
    badge: "UNDER CONSTRUCTION",
    badgeType: "under-construction",
    photo: "/ongoing-projects/photo-vajra.jpg",
    pin: { left: "70.49%", top: "30.42%" },
  },
  {
    id: "agrini",
    name: "Agrini",
    location: "Andalpuram, Madurai",
    title: "Agrini - Apartment and Villa",
    badge: "COMPLETED",
    badgeType: "completed",
    photo: "/ongoing-projects/photo-agrini.jpg",
    pin: { left: "57.78%", top: "59.44%" },
  },
  {
    id: "madhyapuri",
    name: "Madhyapuri",
    location: "Ellis Nagar, Madurai",
    title: "Madhyapuri - 3 BHK Apartment",
    badge: "COMPLETED",
    badgeType: "completed",
    photo: "/ongoing-projects/photo-madhyapuri.jpg",
    pin: { left: "46.18%", top: "36.67%" },
  },
];

const EXTRA_PINS = [{ left: "83.19%", top: "65%" }];

export default function OngoingProjectsSection() {
  const [activeId, setActiveId] = useState(null);
  const scrollerRef = useRef(null);

  // On narrow screens the map overflows horizontally; open centred on the
  // city rather than the empty left edge of the map.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2;
    }
  }, []);

  const toggleProject = (id) =>
    setActiveId((prev) => (prev === id ? null : id));

  const activeProject = PROJECTS.find((project) => project.id === activeId);

  return (
    <section className={styles["ongoing-projects"]}>
      <div className={styles["ongoing-projects__header"]}>
        <Image
          src="/ongoing-projects/star.svg"
          alt=""
          width={32}
          height={32}
          aria-hidden="true"
        />
        <h2 className={styles["ongoing-projects__heading"]}>
          Ongoing Projects
        </h2>
        <Image
          src="/ongoing-projects/star.svg"
          alt=""
          width={32}
          height={32}
          aria-hidden="true"
        />
      </div>

      <div className={styles["ongoing-projects__body"]}>
        <aside className={styles["ongoing-projects__list"]}>
          {PROJECTS.map((project) => {
            const isActive = project.id === activeId;
            return (
              <div
                key={project.id}
                className={styles["ongoing-projects__list-item"]}
              >
                <button
                  type="button"
                  className={`${styles["ongoing-projects__list-button"]} ${
                    isActive
                      ? styles["ongoing-projects__list-button--active"]
                      : ""
                  }`}
                  aria-pressed={isActive}
                  onClick={() => toggleProject(project.id)}
                >
                  {project.name}
                </button>
                {isActive && (
                  <figure className={styles["ongoing-projects__thumb"]}>
                    <span
                      className={styles["ongoing-projects__thumb-image"]}
                    >
                      <Image
                        src={project.photo}
                        alt={project.title}
                        width={440}
                        height={293}
                      />
                    </span>
                    <span
                      className={`${styles["ongoing-projects__badge"]} ${
                        styles[
                          `ongoing-projects__badge--${project.badgeType}`
                        ]
                      }`}
                    >
                      {project.badge}
                    </span>
                  </figure>
                )}
              </div>
            );
          })}
        </aside>

        <div className={styles["ongoing-projects__scroller"]} ref={scrollerRef}>
          <div className={styles["ongoing-projects__stage"]}>
            <div className={styles["ongoing-projects__map"]}>
              <Image
                src="/ongoing-projects/map-madurai.png"
                alt="Stylized map of Madurai showing Visvas project locations"
                fill
                sizes="(min-width: 992px) 120vw, 1330px"
              />
            </div>

            {PROJECTS.map((project) => {
              const isActive = project.id === activeId;
              return (
                <button
                  key={project.id}
                  type="button"
                  className={`${styles["ongoing-projects__pin"]} ${
                    isActive ? styles["ongoing-projects__pin--active"] : ""
                  }`}
                  style={{ left: project.pin.left, top: project.pin.top }}
                  aria-pressed={isActive}
                  aria-label={`Show ${project.name} project on map`}
                  onClick={() => toggleProject(project.id)}
                >
                  <Image
                    src={
                      isActive
                        ? "/ongoing-projects/pin-active.svg"
                        : "/ongoing-projects/pin.svg"
                    }
                    alt=""
                    width={isActive ? 30 : 24}
                    height={isActive ? 40 : 32}
                  />
                </button>
              );
            })}

            {EXTRA_PINS.map((pin, index) => (
              <span
                key={index}
                className={styles["ongoing-projects__pin-decorative"]}
                style={{ left: pin.left, top: pin.top }}
                aria-hidden="true"
              >
                <Image
                  src="/ongoing-projects/pin.svg"
                  alt=""
                  width={24}
                  height={32}
                />
              </span>
            ))}

            <div aria-live="polite">
              {activeProject && (
                <div
                  className={styles["ongoing-projects__card"]}
                  style={{
                    left: activeProject.pin.left,
                    top: activeProject.pin.top,
                  }}
                  role="region"
                  aria-label={activeProject.title}
                >
                  <span className={styles["ongoing-projects__card-location"]}>
                    <Image
                      src="/ongoing-projects/marker.svg"
                      alt=""
                      width={12}
                      height={16}
                    />
                    {activeProject.location}
                  </span>
                  <span className={styles["ongoing-projects__card-title"]}>
                    {activeProject.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
