"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        const filterData = posts.filter(
          (p) =>
             p.prompt.toLowerCase().includes(value.toLowerCase()) ||
            p.tag.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPosts(filterData);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/promt');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data); // Initially set filteredPosts to all posts
    };
    fetchPost();
  }, []);

  return (
    <div>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search For a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
        {searchText ? (
          <PromptCardList
            data={filteredPosts}
            handleTagClick={handleSearchChange}
          />
        ) : (
          <PromptCardList data={posts} handleTagClick={handleSearchChange} />
        )}
      </section>
    </div>
  );
}

export default Feed;
