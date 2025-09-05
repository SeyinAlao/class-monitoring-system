"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {useState} from "react";
import styles from './newreport.module.css';
// import { ChevronDown } from 'lucide-react';

const SAMPLE_REPORTS = [
  {
    id:1,
    code:"ACC 204",
    school: "Veronica Adeleke School of Social Sciences",
    department:"Economics",
    venue:"BBS C104",
    period: "09:00am - 11:00am",
    lecturer: "Dr. Olanrewaju",
    students: 56,
    observations:["Noisy", "Distracted", "Attendance Confirmed", "Peer Discussion"],
    comment: "The class was so disorganized and the lecturer looked at it happen without putting the class in order",
    held: true,
  },
   {
     id: 2,
    code: "ECON 201",
    school: "Veronica Adeleke School of Social Sciences",
    department: "Economics",
    venue: "EAH 102",
    period: "10:00am - 12:00pm",
    lecturer: "Dr. Adewale",
    students: 34,
    observations: ["Focused", "Active Participation"],
    comment: "Very interactive session",
    held: true,
   },
   {
    id: 3,
    code: "ACC 305",
    school: "School of Management",
    department: "Accountancy",
    venue: "Main Hall",
    period: "01:00pm - 02:00pm",
    lecturer: "Prof. Johnson",
    students: 18,
    observations: ["Absent Lecturer"],
    comment: "Lecturer didn't show up",
    held: false,
  },
];

export default function(){
         const router = useRouter();
         const [openId, setOpenId] = useState(null);
         const [open, setOpen] = useState(false); 
         const [filter, setFilter] = useState("held");
  
         const reports = SAMPLE_REPORTS.filter((r) => {
         if (filter === "held") return r.held === true;
         if (filter === "notHeld") return r.held === false;
         return true;
         });

          const heldCount = SAMPLE_REPORTS.filter((r) => r.held).length;
          const notHeldCount = SAMPLE_REPORTS.length - heldCount;

          const toggle = (id) => setOpenId(prev => (prev === id ? null : id));

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
                        className="styles.logoutIcon"
                        onClick={() => router.push('/signin')}
                        />
               </div>
            </div>     
            <div className={styles.content}>
                <h3>Monitoring Details</h3>
            </div>
            <div className={styles.roundContainer}>
                <button 
                 type="button"
                  className={`${styles.round} ${filter === "held" ? styles.selected : ""}`}
                  onClick={() => setFilter("held")}  // updates filter
                  aria-pressed={ filter === "held"}
                >
                    <span className={styles.roundword}>Classes held</span>
                    <span className={styles.number}>{heldCount}</span>
                </button>
                <button
                type="button"
                 className={`${styles.justtext} ${filter === "notHeld" ? styles.selected : ""}`}
                 onClick={() => setFilter("notHeld")} // updates filter
                 aria-pressed= {filter === "notHeld" }
                 >
                    <span className={styles.roundwords}>Classes not held</span>
                    <span className={styles.number}>{notHeldCount}</span>
                </button>
            </div>
 
            <div className={styles.dropdowns}>
                <div className={styles.dropdownList}>
                    {reports.map((r) => {
                        const open = openId === r.id;
                        return(
                            <div key={r.id} className={styles.dropdownItem}>
                                <button
                                className={`${styles.itemHeader} ${open ? styles.itemHeaderOpen : ""}`}
                                onClick={() => toggle(r.id)}
                                aria-expanded={open}
                                aria-controls={`panel-${r.id}`}
                                >
                                    <span className={styles.code}>{r.code}</span>
                                    <div className={styles.chev} onClick={() => setOpen(!open)}>
                                        {open ? (
                                           <Image 
                                           src="/image/chevron-up.svg" 
                                           alt="Collapse" 
                                           className={styles.Icon}
                                           width={20}
                                           height={20}
                                           />
                                        ):(
                                            <Image
                                             src="/image/chevron-down.svg" 
                                             alt="Expand" 
                                             className={styles.Icon}
                                             width={20}
                                             height={20}
                                             />
                                        )}
                                        </div>
                                </button>

                                {open && (
                                    <div id={`panel-${r.id}`} className={styles.itemBody}>
                                        <div className={styles.detailsGrid}>
                                            <div className={styles.col}>
                                                <div className={styles.rowLabel}>School</div>
                                                <div className={styles.rowValue}>{r.school}</div>

                                                <div className={styles.rowLabel}>Venue</div>
                                                <div className={styles.rowValue}>{r.venue}</div>

                                                <div className={styles.rowLabel}>Class Period</div>
                                                <div className={styles.rowValue}>{r.period}</div>

                                                <div className={styles.rowLabel}>Number of Students</div>
                                                <div className={styles.rowValue}>{r.students}</div>
                                            </div>


                                                <div className={styles.col}>
                                                 <div className={styles.rowLabel}>Department</div>
                                                 <div className={styles.rowValue}>{r.department}</div>

                                                 <div className={styles.rowLabel}>Course Code</div>
                                                 <div className={styles.rowValue}>{r.code}</div>

                                                 <div className={styles.rowLabel}>Lecturers Name</div>
                                                 <div className={styles.rowValue}>{r.lecturer}</div>

                                                 <div className={styles.rowLabel}>Observations</div>
                                                 <div className={styles.rowValue}>{r.observations.join(", ")}</div>
                                                </div>
                                        </div>
                                         
                                        <div className={styles.comment}>
                                            <div className={styles.rowLabel}>Comment</div>
                                            <div className={styles.commentText}>{r.comment}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {reports.length === 0 && <div className={styles.empty}>No reports found</div>}
                </div>
            </div>

            <button className={styles.addButtonWrap}
             onClick={() => router.push('/report')}   
            >
                 <div className={styles.plus}>
                        <Image 
                         src="/image/Add.svg"
                         alt="Plus"
                         width={16}
                         height={16}  
                                 
                        />
                         Add New Report
                    </div>
            </button>
        </div>

    );

}