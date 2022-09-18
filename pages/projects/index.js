/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { projects } from "/json/data.json";

export default function Posts({ newsData }) {
  const [searchData, setSearchData] = useState();
  const [inputSearch, setInputSearch] = useState();

  const onChangeHandler = (event) => {
    setInputSearch(event.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${inputSearch}&apiKey=${process.env.API_KEY}`
      )
      .then((response) => {
        setSearchData(response.data.articles);
      });
  }, [inputSearch]);

  return (
    <Layout>
      <p>{projects[0].name}</p>
      {/* <div className="my-[87px]">
        <div className="flex items-center justify-between mb-5">
          <p></p>
          <input
            type="text"
            className=" border-2 border-black w-2/5"
            onChange={onChangeHandler}
            value={inputSearch}
          />
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-[87px] ">
          {newsData.map((data, idx) => {
            return (
              <Project
                judul={data.title}
                desc={data.description}
                url={data.url}
                image={data.urlToImage}
                key={idx}
              />
            );
          })}
        </div>
      </div> */}
    </Layout>
  );
}

const Project = ({ judul, desc, url, image }) => {
  function imageCheck(value) {
    if (value === null) {
      return "/placeholder-image.webp";
    } else {
      return value;
    }
  }

  return (
    <div className="flex gap-9 flex-col lg:flex-row">
      <div className="lg:w-[233px] lg:h-[233px] h-[300px] bg-[#F9F9F9] flex-shrink-0 flex items-center justify-center ">
        <img
          src={imageCheck(image)}
          alt="Image"
          className="object-cover w-full h-full"
        />
      </div>
      <article className="flex flex-col justify-between">
        <div>
          <a href={url} className="font-extrabold text-xl mb-1">
            {judul}
          </a>
          <desc className="text-[#808080] font-light lg:line-clamp-5 line-clamp-3">
            {desc}
          </desc>
        </div>
        <a href={url} target={"_blank"} rel="noreferrer" className="w-max">
          <span>see project</span>
          <div className="w-6 h-[2px] bg-black dark:bg-white " />
        </a>
      </article>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  let newsData;

  await axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`
    )
    .then((res) => {
      newsData = res.data.articles;
    });

  return {
    props: { newsData },
  };
};
