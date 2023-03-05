import styles from '@/styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {Inter} from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })
const Header = () =>{
    return(
        <div className={inter.className}>
        <div className={styles.pageheader}>
        <header className={styles.brandheader}><Link href="/"><Image className={styles.brandimage} src="/logo.png" alt="Phipsiart Logo" width={32} height={32} /></Link></header>
        </div>
        </div>
    )
}
export default Header;