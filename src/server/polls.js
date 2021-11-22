import Axios from 'axios';

const API = "http://localhost:4000"

export const getPolls = async (num) => {
    try {
        console.log(num)
        const res = await Axios.get(`${API}/api/polls?page=${num}`);
        if(res.data.err) 
            throw new Error(res.data.err);
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updatePollVote = async(pollID, indexInArray) => {
    try {
        console.log(pollID, indexInArray)
        const res = await Axios.post(`${API}/api/poll/${pollID}/vote/${indexInArray}`)
        if(!res.data.id)
            throw new Error("Failed to update vote")
        return res.data;
    } catch (error) {
        throw new Error("Failed to find poll")
    }
}