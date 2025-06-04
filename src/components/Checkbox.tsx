import { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string;
   textStyle?: React.CSSProperties; // 스타일 속성
}

const Checkbox: React.FC<CheckBoxProps> = ({ text, textStyle, ...props }) => {
    return (
        <label className={styles.checkboxLabel} >
            <input
                type="checkbox"
                className={styles.checkboxInput}
                {...props} />
            <span className={styles.checkboxCustom}></span>
            {text && <span className={styles.checkboxText} style={textStyle}>{text}</span>}
            {/* text가 있을 경우에만 표시 */}
        </label>
    );
}

/* 사용예시

            <div className='checkboxList'>
             <Checkbox text='동의합니다' 
             checked={checked} onChange={handleChange} />
            </div> 

*/

export default Checkbox;