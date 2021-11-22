import React, { useEffect, useState } from 'react';
import { getPolls, updatePollVote } from '../server/polls';
import PollItem from './PollItem';

const PollsList = () => {
    const [polls, setPolls] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(false)
    useEffect(()=>{
        getAllPolls()
    },[])

    const getAllPolls = () => {
        getPolls(pageNum).then(
            (res)=>{
                setHasMorePages(res.complete);
                let arr = [];
                for(let i = 0; i< res.data.length; i++){
                    arr.push(res.data[i]);
                }
                setPolls(arr);
            },
            (err)=>{
                console.log(err);
            }
        )
    }

    useEffect(()=>{
        getAllPolls();
    },[pageNum])

    const onClickPrev = () => {
        setPageNum(currentNum => currentNum - 1);
        // getAllPolls();
    }
    const onClickNext = () => {
        setPageNum(currentNum => currentNum + 1);
        // getAllPolls();
    }

    const onClickSubmit = (pollID, indexInArray) => {
        updatePollVote(pollID, indexInArray).then(
            (res)=>{
                console.log(res)           
                let copyPolls = [...polls];
                for(let i = 0 ; i< copyPolls.length; i++){
                    if(copyPolls[i].id === pollID)
                    {
                        copyPolls[i].options = res.options
                        break;
                    }
                }
                setPolls(copyPolls)
            },
            (err)=>{
                console.log(err);
            }
        )
    }

    return(
        <div>
            <div>
                {polls?.length > 0 && polls?.map((currentPoll)=> <PollItem header={currentPoll.title} id={currentPoll.id} options={currentPoll.options} onSubmit={onClickSubmit} />)}
            </div>
            <div>
                <button onClick={onClickPrev}>Prev</button>
                <button onClick={onClickNext}>Next</button>
            </div>
        </div>
    );
};

export default PollsList;