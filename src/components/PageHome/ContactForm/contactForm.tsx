"use client"

import React from "react"
import Input from "../../Reusables/Input"
import Button from "../../Reusables/Button"
import style from "./contactForm.module.scss"
import { useForm, ValidationError } from "@formspree/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"

interface IProps {
    contactFormMessage: Document
}

export default function ContactForm({
    contactFormMessage,
}: IProps): React.ReactElement {
    const [state, handleSubmit] = useForm(
        process.env.NEXT_PUBLIC_FORMSPREE_KEY || ""
    )
    if (state.succeeded) {
        return <p>Thanks for your input!</p>
    }
    return (
        <form className={style.root} onSubmit={handleSubmit}>
            <div>{documentToReactComponents(contactFormMessage)}</div>
            <Input
                className={style.input}
                id="email"
                type="email"
                name="email"
                placeholder="joe@gambledhismoney.com"
            />
            <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
            />
            <textarea
                className={style.message}
                id="message"
                name="message"
                placeholder="Your message/suggestion/bug report..."
            />
            <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
            />
            <Button
                className={style.submit}
                type="submit"
                isDisabled={state.submitting}
            >
                Submit
            </Button>
        </form>
    )
}
