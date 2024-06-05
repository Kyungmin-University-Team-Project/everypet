import React, {useState} from 'react';
import styles from "../../pages/moreInformation/moreInformation.module.css";
import Information from "./Information";
import QandA from "./QandA";
import Review from "./Review";
const TabInformationBtn = () => {
    const [activeTab, setActiveTab] = useState<'information' | 'qna' | 'review'>('information');

    const handleTabChange = (tab: 'information' | 'qna' | 'review') => {
        setActiveTab(tab);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'information':
                return <Information />;
            case 'qna':
                return <QandA />;
            case 'review':
                return <Review />;
            default:
                return <Information />;
        }
    };

    return (
        <article className={styles.information}>
            <div className={styles.information_box}>
                <button className={styles.tab_btn}
                        onClick={() => handleTabChange('information')}>상품정보
                </button>
                <button className={styles.tab_btn} onClick={() => handleTabChange('qna')}>리뷰</button>
                <button className={styles.tab_btn} onClick={() => handleTabChange('review')}>Q&A
                </button>
                <button className={styles.tab_btn} onClick={() => handleTabChange('review')}>Q&A
                </button>
            </div>
            {renderTabContent()}
        </article>
    );
};

export default TabInformationBtn;