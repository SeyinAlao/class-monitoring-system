"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from './report.module.css';
import Select from "react-select";
import { useState } from "react";
import { X } from 'lucide-react';

export default function Report() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [school, setSchool] = useState("");
  const [dept, setDept] = useState("");
  const [venue, setVenue] = useState("");
  const [fromPeriod, setFromPeriod] = useState("");
  const [toPeriod, setToPeriod] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [courseCode, setCourseCode] = useState(""); 
  const [numStudents, setNumStudents] = useState(""); 
  const [classHold, setClassHold] = useState("");
  const [selectedObservations, setSelectedObservations] = useState([]); 
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);


  // Options (swap with real data)
  const locations = ["BBS", "SAT", "Activity Hall", "EAH", "BUTH"];
  const schools = ["Select School", "Computing & Engineering", "Public Health", "Management Sciences"];
  const departments = ["Select Department", "Software Engineering", "Computer Science", "Nursing"];
  const venues = ["Select Venue", "Main Hall", "Activity Hall", "EAH 102", "BUTH Lab"];
  const lecturers = ["Select Lecturer", "Dr. Smith", "Prof. Johnson", "Mrs. Adewale", "Mr. Okafor"];
  const observations = ["Serene", "Noisy", "Absent Lecturer", "Uncoordinated", "Student Present", "Focused", "Distracted", "Engaged Classroom", "Group Work", "Silent Study", "Active Participation", "Peer Discussion", "Late Arrival", "Classroom Disruption", "In-Person Interaction", "Feedback Session", "Study Group", "Attendance Confirmed"];
  const classHolds = [ "Select Class Status","Yes", "No"];

    // Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};
  // helper to convert time "HH:MM" -> minutes
  const toMinutes = (t) => {
    if (!t) return null;
    const [h, m] = t.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return h * 60 + m;
  };

  if (!location) newErrors.location = "Location is required";
  if (!school) newErrors.school = "Select a school";
  if (!dept) newErrors.dept = "Select a department";
  if (!venue) newErrors.venue = "Select a venue";
  if (!lecturer) newErrors.lecturer = "Select a lecturer";
  if (!courseCode) newErrors.courseCode = "Course Code is required";
  if (!numStudents) newErrors.numStudents = "Enter number of students";

  const fromMin = toMinutes(fromPeriod);
  const toMin = toMinutes(toPeriod);

  if (!fromPeriod) newErrors.fromPeriod = "Start period is required";
  if (!toPeriod) newErrors.toPeriod = "End period is required";
  if (fromMin !== null && toMin !== null && fromMin >= toMin) {
    newErrors.toPeriod = "End period must be after start period";
  }

  if (selectedObservations.length === 0)
    newErrors.observations = "Select at least one observation";
  if (!classHold) newErrors.classHold = "Indicate if the class held";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // success
  setErrors({});
  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
    router.push("/newreport");
  }, 2500);
};

    return(
        <div className={styles.container}>
            <div className={styles.Header}>
                <div className={styles.contentlabel}>
                    <Image 
                     src="/image/Avatar.svg"
                     alt="Avatar"
                     width={40}
                     height={40}
                    />
                    <div className={styles.textContainer}>
                        <p className={styles.title}>Welcome Esther</p>
                        <p className={styles.subtitle}>Insert description right here.</p>
                    </div>
                </div>
                    <div className={styles.logout}>
                      <Image
                        src="/image/log-out.svg"
                        alt="Logout"
                        width={20}
                        height={20}
                        className={styles.logoutIcon}
                        onClick={() => router.push('/signin')}
                        />
                    </div>     
            </div>
            <form onSubmit={handleSubmit} noValidate>
            <div className={styles.body}>
                <div className={styles.content}>
                  <h3>Class Report</h3>
                   <X 
                   className={styles.cancel}
                   onClick={() => router.push('/newreport')}
                   />
                </div>
                    <section className={styles.formSection} aria-labelledby="locationFilter">
                        <div className={styles.info}>
                          <h4 className={styles.infotext}>Location filter</h4>
                        </div>
                        <div className={styles.radioGroup}>
                            {locations.map((loc) => (
                                <label
                                  key={loc}
                                  className={`${styles.locationRadio} ${location === loc ? styles.locationActive : ""}`}
                                    >
                                    <input
                                      type="radio"
                                      name="location"
                                      value={loc}
                                      checked={location === loc}
                                      onChange={(e) => {
                                        setLocation(e.target.value);
                                         if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
                                      }}
                                    />
                                       <span className={styles.radioLabelText}>{loc}</span>
                                </label>
                            ))}
                        </div>
                         {errors.location && (
                           <p className={styles.error}>{errors.location}</p>
                             )}
                    </section> 
                  
                     {/* School */}
                        <section className={styles.formSection} aria-labelledby="schoolSelect">
                            <div className={styles.info}>
                               <h4 id="schoolSelect" className={styles.infotext}>School</h4>
                            </div>
                            <Select
                              options={schools.map((s) => ({
                              value: s.startsWith("Select") ? "" : s,
                              label: s,
                              }))}
                              value={school ? { value: school, label: school } : null}
                              onChange={(selected) => {
                                setSchool(selected?.value || "");
                                 if (errors.school) setErrors((prev) => ({ ...prev, school: "" }));
                              }}
                              placeholder="Select School"
                              styles={{
                              control: (base) => ({
                               ...base,
                               borderRadius: "10px",
                               
                               Height: "42px",
                               fontSize: "14px",
                              }),
                              menu: (base) => ({
                               ...base,
                               fontSize: "14px",
                               maxHeight: "200px",
                               overflowY: "auto",
                               zIndex: 9999, // keeps it above other elements
                              }),
                              }}
                            />
                             {errors.school && <p className={styles.error}>{errors.school}</p>}
                        </section>


                        {/* Department */}
                        <section className={styles.formSection} aria-labelledby="departmentSelect">
                            <div className={styles.info}>
                               <h4 id="departmentSelect" className={styles.infotext}>Department</h4>
                            </div>
                           <Select
                              options={departments.map((d) => ({
                              value: d.startsWith("Select") ? "" : d,
                              label: d,
                              }))}
                              value={dept ? { value: dept, label: dept } : null}
                              onChange={(selected) =>  {
                                setDept(selected?.value || "");
                                 if (errors.dept) setErrors((prev) => ({ ...prev, dept: "" }));
                                }}
                              placeholder="Select Department"
                              styles={{
                                control: (base) => ({
                                ...base,
                                borderRadius: "10px",
                                minHeight: "40px",
                                fontSize: "14px",
                              }),
                              menu: (base) => ({
                                ...base,
                               fontSize: "14px",
                               maxHeight: "200px",
                               overflowY: "auto",
                               }),
                                 }}
                            />
                             {errors.dept && <p className={styles.error}>{errors.dept}</p>}
                        </section>

                        {/* Venue */}
                        <section className={styles.formSection} aria-labelledby="venueSelect">
                            <div className={styles.info}>
                               <h4 id="venueSelect" className={styles.infotext}>Venue</h4>
                            </div>
                            <Select
                              options={venues.map((v) => ({
                              value: v.startsWith("Select") ? "" : v,
                              label: v,
                              }))}
                             value={venue ? { value:venue, label: venue} : null}
                             onChange={(selected) => {
                              setVenue(selected?.value|| "");
                              if (errors.venue) setErrors((prev) => ({ ...prev, venue: "" }));
                             }}
                             placeholder="Select Venue"
                             styles={{
                              control: (base) => ({
                                ...base,
                                borderRadius: "10px",
                                minHeight: "40px",
                                fontSize: "14px",
                              }),
                              menu: (base) => ({
                                ...base,
                               fontSize: "14px",
                               maxHeight: "200px",
                               overflowY: "auto",
                               }),
                             }}
                             />
                             {errors.venue && <p className={styles.error}>{errors.venue}</p>}
                        </section>

                        {/* Course code */}
                        <section className={styles.formSection} aria-labelledby="courseCode">
                            <div className={styles.info}>
                                <h4 id="courseCode" className={styles.infotext}>Course Code</h4>
                            </div>
                            <input
                               type="text"
                               id="courseCode"
                               name="courseCode"
                               className={styles.input}
                               placeholder="Enter Course Code"
                               inputMode="text"
                               value={courseCode}
                               onChange={(e) => {
                                setCourseCode(e.target.value);
                                if (errors.courseCode) {
                                     setErrors((prev) => ({ ...prev, courseCode: "" }));
                                                  }
                               }}
                               aria-label="Course Code"
                                />
                                    {errors.courseCode && <p className={styles.error}>{errors.courseCode}</p>}
                        </section>

                        {/* Class Period */}
                        <section className={styles.formSection} aria-labelledby="classPeriod">      
                            <div className={styles.info}>
                                <h4 id="classPeriod" className={styles.infotext}>Class Period</h4>
                            </div>
                            <div className={styles.periodContainer}>
                                <div className={styles.period}>
                                    <input
                                    type="time"
                                    placeholder="From"
                                     id="fromPeriod"
                                     name="fromPeriod"
                                     className={styles.select}
                                     value={fromPeriod}
                                     onChange={(e) => {
                                       setFromPeriod(e.target.value);
                                       if (errors.fromPeriod) {
                                         setErrors((prev) => ({ ...prev, fromPeriod: "" }));
                                        }
                                     }}
                                     />
                                     {errors.fromPeriod && <p className={styles.error}>{errors.fromPeriod}</p>}
                                </div>
                                <div className={styles.period}>
                                    <input
                                     type="time"
                                     placeholder="To"
                                     id="toPeriod"
                                     name="toPeriod"
                                     className={styles.select}
                                     value={toPeriod}
                                     onChange={(e) =>{ setToPeriod(e.target.value);
                                              if (errors.toPeriod) {
                                               setErrors((prev) => ({ ...prev, toPeriod: "" }));
                                              }
                                     }}
                                     /> 
                                     {errors.toPeriod && <p className={styles.error}>{errors.toPeriod}</p>}
                                </div>
                            </div>
                             
                        </section>

                        {/* Lecturer's name */}
                        <section className={styles.formSection} aria-labelledby="lecturerName">
                            <div className={styles.info}>
                                <h4 id="lecturerName" className={styles.infotext}>Lecturers Name</h4>
                            </div>
                           <Select
                              options={lecturers.map((l) => ({
                                value:l.startsWith("Select") ? "" : l,
                                label:l,
                              }))}
                               value={lecturer ? { value:lecturer, label: lecturer} : null}
                             onChange={(selected) => {
                              setLecturer(selected?.value|| "");
                              if (errors.lecturer) setErrors((prev) => ({ ...prev, lecturer: "" }));
                             }}
                             placeholder="Select Lecturer"
                              styles={{
                              control: (base) => ({
                                ...base,
                                borderRadius: "10px",
                                minHeight: "40px",
                                fontSize: "14px",
                              }),
                              menu: (base) => ({
                                ...base,
                               fontSize: "14px",
                               maxHeight: "200px",
                               overflowY: "auto",
                               }),
                             }}
                             />
                             {errors.lecturer && (
                                  <p className={styles.error}>{errors.lecturer}</p>
                                    )}
                        </section>

                        {/* number of students */}
                        <section className={styles.formSection} aria-labelledby="numStudents">
                            <div className={styles.info}>
                                <h4 id="numStudents" className={styles.infotext}>Number of Students</h4>
                            </div>
                            <input
                               type="number"
                               id="numStudents"
                               name="numStudents"
                               className={styles.input}
                               placeholder="Enter Number of Students"
                               inputMode="numeric"
                               value={numStudents}
                               onChange={(e) =>{ 
                                setNumStudents(e.target.value);
                                 if (errors.numStudents) setErrors((prev) => ({ ...prev, numStudents: "" }));
                               }}
                               aria-label="Number of Students"
                                />
                                    {errors.numStudents && <p className={styles.error}>{errors.numStudents}</p>}
                        </section>

                        {/* Observation */}
                        <section className={styles.formSection} aria-labelledby="observation">
                            <div className={styles.info}>
                               <h4 className={styles.infotext}>Observation</h4>
                            </div>
                              <div className={styles.radioGroup}>
                                    {observations.map((obs) => {
                                    const isSelected = selectedObservations.includes(obs);
                                    return (
                                    <label
                                         key={obs}
                                         className={`${styles.observationRadio} ${isSelected ? styles.observationActive : ""}`}
                                         >
                                        <input
                                         type="checkbox"
                                         className={styles.checkboxInput}   // hides the native box
                                         value={obs}
                                         checked={isSelected}
                                         onChange={(e) => {
                                         if (e.target.checked) {
                                         setSelectedObservations([...selectedObservations, obs]);
                                         } else {
                                         setSelectedObservations(
                                           selectedObservations.filter((o) => o !== obs)
                                         );
                                         }
                                         }}
                                      
                                        />
                                        <span className={styles.radioLabelText}>{obs}</span>
                                    </label>
                                          );
                                        })}
                                </div>
                                {errors.observations && (
                                  <p className={styles.error}>{errors.observations}</p>
                                    )}
                        </section>

                        {/* Class Hold */}
                        <section className={styles.formSection} aria-labelledby="classHold">
                            <div className={styles.info}>
                                <h4 className={styles.infotext}>Did the Class Hold ?</h4>
                            </div>
                               <Select
                              options={classHolds.map((ch) => ({
                                value:ch.startsWith("Select") ? "" : ch,
                                label:ch,
                              }))}
                               value={classHold ? { value:classHold, label: classHold} : null}
                             onChange={(selected) => { 
                              setClassHold(selected?.value|| "");
                                  if (errors.classHold) setErrors((prev) => ({ ...prev, classHold: "" }));
                             }}
                             placeholder="Select Status"
                              styles={{
                              control: (base) => ({
                                ...base,
                                borderRadius: "10px",
                                minHeight: "40px",
                                fontSize: "14px",
                              }),
                              menu: (base) => ({
                                ...base,
                               fontSize: "14px",
                               maxHeight: "200px",
                               overflowY: "auto",
                               }),
                             }}
                             />
                                    {errors.classHold && (  
                                    <p className={styles.error}>{errors.classHold}</p>
                                        )}
                        </section>
                        {/* Comments */}
                     <section className={styles.formSection} aria-labelledby="Comments">
                            <div className={styles.info}>
                                <h4 id="Comments" className={styles.infotext}> Comments</h4>
                            </div>
                            <textarea
                               id="comments"
                               name="comments"
                               className={styles.textarea}
                               placeholder="Write your own comment"
                               aria-label="Additional Comments"
                                />
                        </section>
            </div>
            <div className={styles.buttonContainer}>
                <button
                 className={styles.button} 
                 type="submit"
                 disabled={showPopup} 
                 >Submit</button>
            </div>    
            </form>

            {showPopup && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popup}>
                      <div className={styles.popupIcon}>
                        <Image 
                        src="/image/Featured icon.svg"
                        alt="Tick"
                        width={64}
                        height={64}
                        />
                      </div>
                      <p className={styles.popupText}>Report submitted successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
}