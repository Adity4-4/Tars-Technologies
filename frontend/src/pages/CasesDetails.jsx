import image2 from '../assets/images/herosectionimage.png'
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CaseCard from '../components/commoncomponents/CaseCard';

function CasesDetails() {
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [relatedCases, setRelatedCases] = useState([]);

    // Read More state
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => setIsExpanded(!isExpanded);
    const maxLength = 300; // max characters before "Read More"

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/cases/${id}`);
                setCaseData(res.data);
            } catch (err) {
                console.error("Error fetching case:", err);
            }
        };

        const fetchRelatedCases = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/cases");

                // exclude current case, take 2 others
                const filtered = res.data.filter(b => b._id !== id).slice(0, 2);
                setRelatedCases(filtered);
            } catch (err) {
                console.error("Error fetching related cases: ", err)
            }
        }

        fetchCase();
        fetchRelatedCases();
    }, [id]);

    if (!caseData) return <p>Loading...</p>;

    return (
        <>
            <div className='px-8 md:px-10 pt-16 lg:pt-32 pb-10 flex flex-col lg:flex-row bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
                <div className=' flex-1 '>
                    <h1 className='text-[26px] md:text-[32px] lg:text-[48px] mt-6 md:mt-10 lg:mt-3 uppercase font-[neutral_face]'>{caseData.title}</h1>
                    <p className=' lg:w-[520px] h-[200px] lg:h-[350px] text-[12px] lg:text-[14px] text-[#9C9C9C] font-[500] overflow-hidden'>
                        {isExpanded
                            ? caseData.description
                            : caseData.description?.length > maxLength
                                ? caseData.description.substring(0, maxLength) + "..."
                                : caseData.description}
                    </p>

                    {caseData.description?.length > maxLength && (
                        <button
                            onClick={toggleReadMore}
                            className="text-blue-500 mt-2 text-[12px] lg:text-[14px] font-semibold hover:underline"
                        >
                            {isExpanded ? "Read Less" : "Read More"}
                        </button>
                    )}
                    <div className='mt-18 text-[#9C9C9C] text-[12px] lg:text-[14px] '>
                        <span className=''>Space and Universe</span>
                        <span className=''> | </span>
                        <span className=''>Daniel albarta</span>
                        <span className=''> | </span>
                        <span className=''>October 22, 2023</span>
                    </div>
                </div>
                <div className='flex-1 flex flex-col md:flex-row gap-5 py-6'>
                    <div className=' w-[300px] h-[200px] md:h-[530px]'>
                        <img
                            src={caseData.images[0]?.url || image2}
                            className="w-full h-full object-cover "
                        />
                    </div>
                    <div className='flex-1 space-y-5 text-[12px] md:text-[14px] '>
                        <div>
                            <p className='text-[16px] md:text-[20px] '>Problem Before - </p>
                            <p className=' text-[#FFFFFFCC] h-[120px] '>{caseData.details?.problemBefore || '-'}</p>
                        </div>
                        <div>
                            <p className='text-[16px] md:text-[20px] '>Problem Solved - </p>
                            <p className=' text-[#FFFFFFCC] h-[120px] '>{caseData.details?.problemSolved || '-'}</p>
                        </div>
                        <div>
                            <p className='text-[16px] md:text-[20px] '>What we Add - </p>
                            <p className=' text-[#FFFFFFCC] h-[120px] '>{caseData.details?.whatWeAdd || '-'}</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* RELATED CASES SECTION */}
            <div className="px-5 md:px-10 py-10 md:py-20 bg-gradient-to-b from-black to-[#1E1E1E] text-white">
                <p className="text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face] text-center mb-10">
                    Related Cases
                </p>
                <div >
                    {relatedCases.length > 0 ? relatedCases.map(item => (
                        <CaseCard
                            key={item._id}
                            image={item.images}
                            title={item.title}
                            description={item.description}
                            contentDiv='w-[260px] lg:w-[450px]'
                            showText={false}
                            button='Know More &nbsp; →'
                            link={`/cases-details/${item._id}`}
                        />
                    )) : (
                        <p className='text-gray-400'>No related cases found</p>
                    )}
                </div>
            </div>

        </>
    )
}

export default CasesDetails
