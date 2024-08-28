"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Form from "@components/Form";

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            if (!promptId) return; // Guard clause

            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch prompt details");
                }

                const data = await response.json();
                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
            } catch (error) {
                console.error("Error fetching prompt details:", error);
                // Handle the error gracefully, maybe redirect or show a message
            }
        };

        getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok) {
                router.push('/');
            } else {
                throw new Error("Failed to update prompt");
            }
        } catch (error) {
            console.error("Error updating prompt:", error);
        } finally {
            setSubmitting(false);
        }
    };

    // Optionally, show a loading state or a specific error message
    if (!promptId) {
        return <p>Loading...</p>;
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
}

export default dynamic(() => Promise.resolve(EditPrompt), { ssr: false });
