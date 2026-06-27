import React from 'react'
import CareerPath from '../course/career_path'

function Admissionhacks() {
    const aboutFeatureCards = [
        {
            title: "Plan Your Finances Wisely",
            description:
                "Perform well in your board exams and look for universities that provide scholarship options, as it will lower your financial burden.",
            icon: "",
            imageUrl: "",
        },
        {
            title: "Take Up Career Counselling",
            description:
                "Select universities that have career counsellors, as they will help you identify your strengths, weaknesses, and interests.",
            icon: "",
            imageUrl: "https://cdn.kalingauniversity.ac.in/admission/Admission+Procedure/2.svg",
        },
        {
            title: "Select Future-Proof Careers",
            description:
                "Opt for high-demanding careers like AI, ML, Cybersecurity, Designing, Management, Engineering, Law, Pharmacy, and more.",
            icon: "",
            imageUrl: "https://cdn.kalingauniversity.ac.in/kalinga_backend/files/course/career_icons/businessman_1.svg",
        },
        {
            title: "Prioritise Colleges Offering Placements",
            description:
                "Choose universities that have strong industry connections and provide internship opportunities or conduct campus placement drives.",
            icon: "",
            imageUrl: "https://cdn.kalingauniversity.ac.in/admission/Admission+Procedure/4.svg",
        },
        {
            title: "Check University Accreditation",
            description:
                "Choose accredited universities only as they offer recognised degrees, focus on holistic development, and provide quality education.",
            icon: "",
            imageUrl: "https://cdn.kalingauniversity.ac.in/admission/Admission+Procedure/5.svg",
        },
        {
            title: "Think Beyond Academics",
            description:
                "Select universities that offer hands-on training programs, facilitate research work, conduct workshops and seminars, and make you job-ready.",
            icon: "",
            imageUrl: "https://cdn.kalingauniversity.ac.in/admission/Admission+Procedure/6.svg",
        },
        {
            title: "Look For Student Reviews",
            description:
                "Before making your final decision, check out other students' opinions or interact with your seniors to understand academic quality.",
            icon: "",
            imageUrl: "https://cdn.kalingauniversity.ac.in/admission/Admission+Procedure/7.svg",
        },
        {
            title: "Vibrant Campus Life",
            description:
                "Take admission into a university that conducts various events, fests, celebrations, and competitions that complement academic learning.",
            icon: "",
            imageUrl: "https://cdn.kalingauniversity.ac.in/admission/Admission+Procedure/8.svg",
        },
        {
            title: "Location and Connectivity",
            description:
                "If the university is far from your home, ensure it provides transportation facilities for your safety and convenience.",
            icon: "",
            imageUrl: "https://cdn.kalingauniversity.ac.in/admission/Admission+Procedure/9.svg",
        },
    ];

    return (
        <div className='mt-7'>
            <CareerPath careers={aboutFeatureCards} title='Master These University Selection Hacks' description='' />
        </div>
    )
}

export default Admissionhacks