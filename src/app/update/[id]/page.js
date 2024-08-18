"use client";

import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from "react";

export default function Update() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        fetch( process.env.NEXT_PUBLIC_API_URL + `posts/${params.id}`)
            .then(resp => resp.json())
            .then(posts => {
                setTitle(posts.title);
                setContent(posts.content);
            })
    }, []);

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title = e.target.title.value;
            const content = e.target.content.value;
            const options = {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title, content})
            };

            fetch(`http://localhost:9999/posts/${id}`, options)
                .then(resp => resp.json())
                .then(posts => {
                    const lastId = posts.id;
                    router.push(`/read/${lastId}`);
                    router.refresh();
                });


        }}>
            <p>
                <input type={"text"} name={"title"} placeholder={"title"} value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </p>
            <p>
                <textarea name={"content"} placeholder={"content"} value={content}
                onChange={(e) => setContent(e.target.value)}
                />
            </p>
            <p>
                <input type={"submit"} value={"create"} />
            </p>
        </form>
    );
}