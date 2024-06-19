import { useState } from 'react';

import { BsTrash } from "react-icons/bs";

function Form() {
    const dataDefault = {
        title: '',
        image:'',
        description: '',
        category: '',
        publish: false,
        tags:[],
    } 

    const categories = ['cibo', 'web', 'videogames', 'informatica']
    const allTags = ['html', 'css', 'js', 'php']

    const [blogs, setBlogs] = useState([]);
    const [blogData, setBlogData] = useState(dataDefault);

    const handleTitle = (event) => {
        event.preventDefault();

        setBlogs(array => ([...array, blogData]));

        setBlogData(dataDefault);
    }

    const deleteTitle = indexTitle => { 
        setBlogs(blogs => blogs.filter((_, index) => indexTitle !== index))
    }

    const addData = (key, newData) => {
        setBlogData(data => ({...data, [key]: newData}))
    }

    const addTags = (tag) => {
        const currentTag = blogData.tags;
        const newTags = currentTag.includes(tag) ? currentTag.filter(element => element !== tag) : [...currentTag, tag];
        addData('tags', newTags)
    }
    return (
        <div className="form">
            <h1>Form</h1>
            <form onSubmit={handleTitle}>

                <div>
                    <label htmlFor="title">Titolo</label>
                    <input
                        id="title"
                        type="text"
                        value={blogData.title}
                        onChange={event => addData('title', event.target.value)}
                    />
                </div>

                <div className="margin">
                    <label htmlFor="image">Url Immagine</label>
                    <input
                        id="image"
                        type="text"
                        value={blogData.image}
                        onChange={event => addData('image', event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="description">Descrizione</label>
                    <textarea
                        id="description"
                        value={blogData.description}
                        onChange={event => addData('description', event.target.value)}
                    ></textarea>
                </div>

                <div className="margin">
                <label htmlFor="category">Scegli la categoria</label>
                    <select
                        id="category"
                        value={blogData.category}
                        onChange={event => addData('category', event.target.value)}
                    >
                        <option selected>Categoria</option>
                        {
                            categories.map((category, index) => (
                                <option
                                    key={`category_${index}`}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="check">
                    {
                        allTags.map((tag, index) => (
                            <div key={`tag_${index}`}>
                                <input
                                    id="tags"
                                    type="checkbox"
                                    checked={blogData.tags.includes(tag)}
                                    onChange={() => addTags(tag)}
                                />
                                <label htmlFor="tags">
                                  {tag}
                                </label>
                            </div>
                        ))
                    }
                </div>

                <div className="margin">
                    <input
                        id="publish"
                        type="checkbox"
                        checked={blogData.publish}
                        onChange={(event) => addData('publish', Boolean(event.target.checked))}
                    />
                    <label htmlFor="publish">
                      Pubblica
                    </label>
                </div>

                <button>Invia</button>
            </form>
            <div className="card-container">
                {
                    blogs.map((blog, index) => (
                        <div key={`card_${index}`} className="card">

                            <figure>
                                <img src={blog.image} alt="" />
                            </figure>

                            <div className="text">
                                
                            <div className="title">
                                    <h3>{blog.title}</h3>
                                    {
                                        blog.publish === true ||
                                        <span>Bozza</span>
                                    }
                                <button onClick={() => deleteTitle(index)}><BsTrash /></button>
                            </div>

                            <div className="description">
                                <p>{blog.description}</p>
                            </div>

                            <div className="category">
                                <span>{blog.category}</span>
                            </div>
                                
                            <div className="tags">
                                {
                                    blog.tags.map(tag => <span>{tag}</span>)
                                }
                            </div>

                            </div>


                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Form