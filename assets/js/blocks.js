import { createElement } from "./dom.js";

export function buildLeftBlocks(cv) {
    const blocks = [];

    if (cv.personal?.photo) {
        const photo = createElement("div", { class: "blk block-photo" }, [
            createElement("img", { src: cv.personal.photo, alt: "Фото" })
        ]);
        blocks.push(photo);
    }

    const contacts = createElement("div", { class: "blk block-contacts" }, [
        createElement("h2", { text: "Контакты" }),
        createElement("ul", {}, [])
    ]);
    const contactsList = contacts.querySelector("ul");

    if (cv.contacts?.email) {
        contactsList.appendChild(
            createElement("li", {
                html: `📧 <a href="mailto:${cv.contacts.email}">${cv.contacts.email}</a>`
            })
        );
    }

    if (cv.contacts?.phone) {
        const tel = cv.contacts.phone.replace(/\s|-/g, "");
        contactsList.appendChild(
            createElement("li", {
                html: `📱 <a href="tel:${tel}">${cv.contacts.phone}</a>`
            })
        );
    }

    if (cv.contacts?.location) {
        contactsList.appendChild(createElement("li", { text: `📍 ${cv.contacts.location}` }));
    }

    if (cv.contacts?.telegram) {
        const telegramText = cv.contacts.telegram.replace(/^https?:\/\//, "");
        contactsList.appendChild(
            createElement("li", {
                html: `💬 <a href="${cv.contacts.telegram}" target="_blank">${telegramText}</a>`
            })
        );
    }

    blocks.push(contacts);

    if (Array.isArray(cv.skills) && cv.skills.length > 0) {
        blocks.push(
            createElement("div", { class: "blk block-skills" }, [
                createElement("h2", { text: "Навыки" }),
                createElement(
                    "ul",
                    { class: "pillset" },
                    cv.skills.map((skill) => createElement("li", { text: skill }))
                )
            ])
        );
    }

    if (Array.isArray(cv.tools) && cv.tools.length > 0) {
        blocks.push(
            createElement("div", { class: "blk block-tools" }, [
                createElement("h2", { text: "Инструменты" }),
                createElement(
                    "ul",
                    { class: "pillset" },
                    cv.tools.map((tool) => createElement("li", { text: tool }))
                )
            ])
        );
    }

    return blocks;
}

export function buildRightBlocks(cv) {
    const blocks = [];

    const heading = createElement("div", { class: "blk" }, [
        createElement("div", { class: "block-name" }, [
            createElement("h1", { text: cv.personal?.name || "" })
        ]),
        createElement("div", { class: "block-position", text: cv.personal?.position || "" })
    ]);
    blocks.push(heading);

    if (cv.personal?.about) {
        blocks.push(
            createElement("div", { class: "blk block-about-me" }, [
                createElement("h2", { text: "Обо мне" }),
                createElement("p", { text: cv.personal.about })
            ])
        );
    }

    if (Array.isArray(cv.experience) && cv.experience.length > 0) {
        blocks.push(createElement("div", { class: "blk" }, [createElement("h2", { text: "Опыт работы" })]));

        cv.experience.forEach((job) => {
            const responsibilities =
                Array.isArray(job.responsibilities) && job.responsibilities.length > 0
                    ? createElement(
                          "ul",
                          {},
                          job.responsibilities.map((item) => createElement("li", { text: item }))
                      )
                    : createElement("div");

            const jobBlock = createElement("div", { class: "blk block-experience" }, [
                createElement("div", { class: "job" }, [
                    createElement("h3", { text: `${job.company} — ${job.position}` }),
                    createElement("div", {
                        class: "meta",
                        text: `${job.period}${job.location ? `, ${job.location}` : ""}`
                    }),
                    responsibilities
                ])
            ]);

            jobBlock.dataset.section = "experience";
            blocks.push(jobBlock);
        });
    }

    if (Array.isArray(cv.education) && cv.education.length > 0) {
        blocks.push(createElement("div", { class: "blk" }, [createElement("h2", { text: "Образование" })]));

        cv.education.forEach((education) => {
            const educationBlock = createElement("div", { class: "blk block-education" }, [
                createElement("p", {}, [
                    createElement("strong", { text: education.institution || "" }),
                    createElement("br"),
                    createElement("span", {
                        class: "meta",
                        text: `${education.period || ""} · ${education.program || ""}`
                    })
                ])
            ]);

            educationBlock.dataset.section = "education";
            blocks.push(educationBlock);
        });
    }

    return blocks;
}
