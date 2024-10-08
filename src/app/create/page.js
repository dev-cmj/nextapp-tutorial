"use client";

import {useRouter} from 'next/navigation';

export default function Create() {
    const router = useRouter();
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title = e.target.title.value;
            const content = e.target.content.value;
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title, content})
            };

            fetch(process.env.NEXT_PUBLIC_API_URL + `posts`, options)
            .then(resp => resp.json())
            .then(posts => {
                const lastId = posts.id;
                router.push(`/read/${lastId}`);
                router.refresh();
            });


        }}>
            <p>
                <input type={"text"} name={"title"} placeholder={"title"} />
            </p>
            <p>
                <textarea name={"content"} placeholder={"content"} />
            </p>
            <p>
                <input type={"submit"} value={"create"} />
            </p>
        </form>
    );
}