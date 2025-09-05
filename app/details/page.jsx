 "use client";
import Image from "next/image";
import styles from './details.module.css';
import { useRouter } from "next/navigation";

export default function Details() {

     const router = useRouter();

    return (
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
                <div className={styles.round}>
                    <h3 className={styles.roundword}>Classes held</h3>
                    <p className={styles.number}>0</p>
                </div>
                <div className={styles.justtext}>
                    <h3 className={styles.roundwords}>Classes not held</h3>
                    <p className={styles.number}>0</p>
                </div>
            </div>
            <div className={styles.Report}>
                <div className={styles.Image}>
                    <Image 
                     src="/image/image 9.svg"
                     alt="Report"
                     width={150}
                     height={150}
                    />
                </div>
                <p className={styles.Reporttext}>
                    You have not reported any class, to add a monitoring report click on <span className={styles.new}>“New Report”</span> below
                </p>
                <button className={styles.newreport}
                 onClick={() => router.push('/report')} 
                >
                    <div className={styles.plus}>
                        <Image 
                         src="/image/Add.svg"
                         alt="Plus"
                         width={16}
                         height={16}  
                                   
                        />
                    </div>
                    New Report
                </button>   
            </div>
                <footer className={styles.footer}>
                  <p>2025 Office of DAP</p>
                </footer>
        </div>
     );
 }