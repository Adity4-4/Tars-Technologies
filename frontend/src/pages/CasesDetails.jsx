import image2 from '../assets/images/herosectionimage.png'
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CaseCard from '../components/commoncomponents/CaseCard';

function CasesDetails() {
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [relatedCases, setRelatedCases] = useState([]);

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
            <div className='px-10 lg:pt-40 pb-10 flex justify-between gap-15 bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
                <div className=' flex-1 '>
                    <h1 className='text-[46px] lg:text-[48px] mt-1 md:mt-3 uppercase font-[neutral_face]'>{caseData.title}</h1>
                    <p className='w-[520px] h-[350px] text-[12px] lg:text-[14px] text-[#9C9C9C] font-[500] '>{caseData.description}</p>
                    <div className='mt-18 text-[#9C9C9C] text-[12px] lg:text-[14px] '>
                        <span className=''>Space and Universe</span>
                        <span className=''> | </span>
                        <span className=''>Daniel albarta</span>
                        <span className=''> | </span>
                        <span className=''>October 22, 2023</span>
                    </div>
                </div>
                <div className=' w-[300px] h-[530px]'>
                    <img
                        src={caseData.images[0]?.url || image2}
                        className="w-full h-full object-cover "
                    />
                </div>
                <div className='flex-1 space-y-5 '>
                    <div>
                        <p className='text-[20px] '>Problem Before - </p>
                        <p className='text-[14px] text-[#FFFFFFCC] h-[120px] '>{caseData.details?.problemBefore || '-'}</p>
                    </div>
                    <div>
                        <p className='text-[20px] '>Problem Solved - </p>
                        <p className='text-[14px] text-[#FFFFFFCC] h-[120px] '>{caseData.details?.problemSolved || '-'}</p>
                    </div>
                    <div>
                        <p className='text-[20px] '>What we Add - </p>
                        <p className='text-[14px] text-[#FFFFFFCC] h-[120px] '>{caseData.details?.whatWeAdd || '-'}</p>
                    </div>
                </div>
            </div>


            {/* RELATED CASES SECTION */}
            <div className="px-10 py-20 bg-gradient-to-b from-black to-[#1E1E1E] text-white">
                <p className="text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face] text-center mb-10">
                    Related Cases
                </p>
                <div className="flex flex-wrap justify-center gap-10">
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
