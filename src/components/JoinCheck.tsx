import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Login from '../pages/Login.module.css';
import Checkbox from './Checkbox';

export interface JoinCheckRef {
    isRequiredChecked: () => boolean;
}

const JoinCheck = forwardRef<JoinCheckRef>((props, ref) => {

    const [checkedList, setCheckedList] = useState([false, false, false]);
    const [adChecked, setAdChecked] = useState(false);

    //필수 항목 모두 체크 여부 반환
    useImperativeHandle(ref, () => ({
        isRequiredChecked: () => checkedList.every(Boolean),
    }));

    // 전체 동의 체크박스 상태 
    const allChecked = checkedList.every(Boolean) && adChecked;
    const requiredAllChecked = checkedList.every(Boolean);

    //전체동의 클릭 시
    const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setCheckedList([checked, checked, checked]);
        setAdChecked(checked);
    };

    // 개별 체크박스 클릭 시
    const handleCheck = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newList = [...checkedList];
        newList[idx] = e.target.checked;
        setCheckedList(newList);
    };

    // 광고성 정보 수신 동의 클릭 시
    const handleAdCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdChecked(e.target.checked);
    };


    return (
        <div className={Login.con}>
            <div className={Login.title}>
                <img src="/images/login/logoimg_small.svg" alt="logo" className={Login.logo} />
                <h1>서비스 약관에 동의해주세요.</h1>
            </div>{/* title */}

            <div className='checkboxs'>
                <div style={{ borderBottom: "1px solid var(--stroke-lightE)" }}>
                    <Checkbox text='전체 동의합니다'
                        checked={requiredAllChecked && adChecked}
                        onChange={handleAllCheck}
                    />
                </div>{/* 전체동의 */}

                <ul style={{ marginTop: "var(--space8)" }}>
                    <li>
                        <Checkbox
                            required
                            text='만 14세 이상입니다.'
                            checked={checkedList[0]}
                            onChange={handleCheck(0)}
                            textStyle={{
                                color: "var(--text-grey)",
                                fontSize: "var(--font-body2)",
                                fontWeight: 400,
                                lineHeight: "160%"
                            }}
                        />
                    </li>
                    <li>
                        <Checkbox
                            required
                            text='이용약관 동의'
                            checked={checkedList[1]}
                            onChange={handleCheck(1)}
                            textStyle={{
                                color: "var(--text-grey)",
                                fontSize: "var(--font-body2)",
                                fontWeight: 400,
                                lineHeight: "160%"
                            }}
                        />
                    </li>
                    <li>
                        <Checkbox
                            required
                            text='개인정보수집・이용 동의'
                            checked={checkedList[2]}
                            onChange={handleCheck(2)}
                            textStyle={{
                                color: "var(--text-grey)",
                                fontSize: "var(--font-body2)",
                                fontWeight: 400,
                                lineHeight: "160%"
                            }}
                        />
                    </li>
                    <li>
                        <Checkbox
                            text='(선택) 광고성 정보 수신동의'
                            checked={adChecked}
                            onChange={handleAdCheck}
                            textStyle={{
                                color: "var(--text-grey)",
                                fontSize: "var(--font-body2)",
                                fontWeight: 400,
                                lineHeight: "160%"
                            }}
                        />
                    </li>
                </ul>
            </div>

        </div>
    );

});

export default JoinCheck;