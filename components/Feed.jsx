"use client"
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({data, handleTagClick}) => {
    return(
        <div className="mt-16 prompt_layout">
            {
                data.map((post) =>(
                    <PromptCard key={post._id} post={post} 
                    handleTagClick={handleTagClick}/>
                ))
            }
        </div>
    )
}

const Feed = () =>{
    const [posts, setPosts] = useState([]);

    const [searchText,setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

 
    const fetchPosts = async() =>{
        try{
            const response = await fetch('/api/prompt');
                   if (!response.ok) {
            // If the response is not successful, throw an error with the status text
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
            const data = await response.json();
            setPosts(data);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchPosts();
    },[]);
    const filterPrompts = (searchtext) =>{
        const regex = new RegExp(searchtext, "i");
        return posts.filter((item)=> 
        regex.test(item.creator.username) || 
        regex.test(item.tag) || 
        regex.test(item.prompt)
    );
    };
    const handleSearchChange = (e) =>{
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
        setSearchTimeout(
            setTimeout(()=>{
            const searchResult = filterPrompts(e.target.value);
            setSearchedResults(searchResult);
        },500)
    );
    }
    const handleTagClick = (tagName) =>{
        setSearchText(tagName);
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    }
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" className="search_input peer" 
                placeholder="search for a tag or usernaem" value={searchText}
                onChange={handleSearchChange} required/>
            </form>

            {
                searchText ? (
                    <PromptCardList 
                    data={searchedResults}
                    handleTagClick={handleTagClick}/>
                ):(<PromptCardList data={posts} handleTagClick={handleTagClick} />)
            }
        </section>
    )
}
export default Feed;