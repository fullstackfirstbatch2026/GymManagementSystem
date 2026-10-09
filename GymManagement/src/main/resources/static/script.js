const API = "http://localhost:8083";


/* ================================================= */
/* COMMON API FUNCTION */
/* ================================================= */

async function apiRequest(url, options = {}) {

    try {

        const response = await fetch(API + url, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options
        });

        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(
                errorText || `HTTP Error ${response.status}`
            );
        }

        const text = await response.text();

        if (!text) {
            return null;
        }

        try {
            return JSON.parse(text);
        } catch {
            return text;
        }

    } catch (error) {

        console.error(error);

        showMessage(
            "Backend connection error: " + error.message
        );

        throw error;
    }
}


/* ================================================= */
/* MESSAGE */
/* ================================================= */

function showMessage(message) {

    const box = document.getElementById("messageBox");

    const div = document.createElement("div");

    div.className = "message";

    div.textContent = message;

    box.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3500);
}


/* ================================================= */
/* NAVIGATION */
/* ================================================= */

function openSection(sectionName) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.classList.remove("active");
    });

    const selectedPage =
        document.getElementById(sectionName);

    if (!selectedPage) {
        console.error("Section not found:", sectionName);
        return;
    }

    selectedPage.classList.add("active");

    const selectedButton =
        document.querySelector(
            `.nav-btn[data-page="${sectionName}"]`
        );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }

    if (sectionName === "dashboard") {
        loadCounts();
    }

    if (sectionName === "members") {
        getMembers();
    }

    if (sectionName === "trainers") {
        getTrainers();
    }

    if (sectionName === "plans") {
        getPlans();
    }

    if (sectionName === "memberships") {
        getMemberships();
        loadMembershipDropdowns();
    }
}


/* ================================================= */
/* MEMBERS */
/* ================================================= */

async function getMembers() {

    try {

        const data = await apiRequest("/members");

        const container =
            document.getElementById("membersList");

        if (!data || data.length === 0) {

            container.innerHTML =
                "<p>No members found.</p>";

            return;
        }

        let html = `
            <div class="table-wrapper">
            <table class="data-table">

            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
            </tr>
        `;

        data.forEach(member => {

            html += `
                <tr>

                    <td>${member.memberId}</td>

                    <td>${member.memberName}</td>

                    <td>${member.email}</td>

                    <td>${member.phone}</td>

                    <td>${member.age}</td>

                    <td>${member.gender}</td>

                    <td>
                        <button
                            class="delete-btn"
                            onclick="deleteMember(${member.memberId})">

                            Delete

                        </button>
                    </td>

                </tr>
            `;
        });

        html += `
            </table>
            </div>
        `;

        container.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}


/* ================================================= */
/* ADD MEMBER */
/* ================================================= */

async function addMember(event) {

    event.preventDefault();

    const data = {

        memberName:
        document.getElementById("memberName").value,

        email:
        document.getElementById("memberEmail").value,

        phone:
        document.getElementById("memberPhone").value,

        age:
            Number(document.getElementById("memberAge").value),

        gender:
        document.getElementById("memberGender").value
    };

    await apiRequest("/members", {

        method: "POST",

        body: JSON.stringify(data)

    });

    showMessage("Member added successfully!");

    document.getElementById("memberForm").reset();

    getMembers();

    loadCounts();
}


/* ================================================= */
/* DELETE MEMBER */
/* ================================================= */

async function deleteMember(id) {

    if (!confirm("Delete this member?")) {
        return;
    }

    await apiRequest(`/members/${id}`, {
        method: "DELETE"
    });

    showMessage("Member deleted.");

    getMembers();

    loadCounts();
}


/* ================================================= */
/* TRAINERS */
/* ================================================= */

async function getTrainers() {

    try {

        const data = await apiRequest("/trainers");

        const container =
            document.getElementById("trainersList");

        if (!data || data.length === 0) {

            container.innerHTML =
                "<p>No trainers found.</p>";

            return;
        }

        let html = `
            <div class="table-wrapper">
            <table class="data-table">

            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Phone</th>
            </tr>
        `;

        data.forEach(trainer => {

            html += `
                <tr>
                    <td>${trainer.trainerId}</td>
                    <td>${trainer.trainerName}</td>
                    <td>${trainer.specialization}</td>
                    <td>${trainer.phone}</td>
                </tr>
            `;
        });

        html += `
            </table>
            </div>
        `;

        container.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}


/* ================================================= */
/* PLANS */
/* ================================================= */

async function getPlans() {

    try {

        const data = await apiRequest("/plans");

        const container =
            document.getElementById("plansList");

        if (!data || data.length === 0) {

            container.innerHTML =
                "<p>No plans found.</p>";

            return;
        }

        let html = `
            <div class="table-wrapper">
            <table class="data-table">

            <tr>
                <th>ID</th>
                <th>Plan</th>
                <th>Duration</th>
                <th>Price</th>
            </tr>
        `;

        data.forEach(plan => {

            html += `
                <tr>

                    <td>${plan.planId}</td>

                    <td>${plan.planName}</td>

                    <td>
                        ${plan.durationMonths} months
                    </td>

                    <td>
                        ₹${plan.price}
                    </td>

                </tr>
            `;
        });

        html += `
            </table>
            </div>
        `;

        container.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}


/* ================================================= */
/* MEMBERSHIP DROPDOWNS */
/* ================================================= */

async function loadMembershipDropdowns() {

    try {

        const members =
            await apiRequest("/members");

        const trainers =
            await apiRequest("/trainers");

        const plans =
            await apiRequest("/plans");


        const memberSelect =
            document.getElementById("membershipMember");

        const trainerSelect =
            document.getElementById("membershipTrainer");

        const planSelect =
            document.getElementById("membershipPlan");


        memberSelect.innerHTML =
            `<option value="">Select Member</option>`;

        members.forEach(member => {

            memberSelect.innerHTML += `
                <option value="${member.memberId}">
                    ${member.memberName}
                    (ID ${member.memberId})
                </option>
            `;
        });


        trainerSelect.innerHTML =
            `<option value="">Select Trainer</option>`;

        trainers.forEach(trainer => {

            trainerSelect.innerHTML += `
                <option value="${trainer.trainerId}">
                    ${trainer.trainerName}
                    (ID ${trainer.trainerId})
                </option>
            `;
        });


        planSelect.innerHTML =
            `<option value="">Select Plan</option>`;

        plans.forEach(plan => {

            planSelect.innerHTML += `
                <option
                    value="${plan.planId}"
                    data-duration="${plan.durationMonths}">

                    ${plan.planName}
                    - ₹${plan.price}
                    (${plan.durationMonths} months)

                </option>
            `;
        });

    } catch (error) {

        console.error(error);

    }
}


/* ================================================= */
/* CALCULATE EXPIRY - DATABASE FUNCTION */
/* ================================================= */

async function calculateExpiry() {

    try {

        const startDate =
            document.getElementById(
                "membershipStartDate"
            ).value;

        const planSelect =
            document.getElementById(
                "membershipPlan"
            );

        const selectedOption =
            planSelect.options[
                planSelect.selectedIndex
                ];


        if (!startDate) {

            showMessage(
                "Please select Start Date first."
            );

            return;
        }


        if (!planSelect.value) {

            showMessage(
                "Please select a Plan first."
            );

            return;
        }


        const durationMonths =
            Number(
                selectedOption.dataset.duration
            );


        if (!durationMonths) {

            showMessage(
                "Invalid plan duration."
            );

            return;
        }


        const result =
            await apiRequest(
                "/memberships/calculate-expiry",
                {
                    method: "POST",

                    body: JSON.stringify({

                        startDate: startDate,

                        durationMonths:
                        durationMonths

                    })
                }
            );


        let expiryDate = result;


        /*
         * Spring Boot normally returns:
         * "2027-04-05"
         */

        if (typeof result === "object") {

            expiryDate =
                result.expiryDate ||
                result.result ||
                result.value;
        }


        if (!expiryDate) {

            showMessage(
                "Expiry date was not returned."
            );

            return;
        }


        document.getElementById(
            "membershipExpiryDate"
        ).value = expiryDate;


        showMessage(
            "Expiry date calculated successfully!"
        );


    } catch (error) {

        console.error(
            "Calculate expiry error:",
            error
        );

    }
}


/* ================================================= */
/* REGISTER MEMBERSHIP - PROCEDURE */
/* ================================================= */

async function registerMembership(event) {

    event.preventDefault();

    try {

        const memberId =
            Number(
                document.getElementById(
                    "membershipMember"
                ).value
            );

        const trainerId =
            Number(
                document.getElementById(
                    "membershipTrainer"
                ).value
            );

        const planId =
            Number(
                document.getElementById(
                    "membershipPlan"
                ).value
            );

        const startDate =
            document.getElementById(
                "membershipStartDate"
            ).value;

        const expiryDate =
            document.getElementById(
                "membershipExpiryDate"
            ).value;


        if (
            !memberId ||
            !trainerId ||
            !planId ||
            !startDate
        ) {

            showMessage(
                "Please fill all membership details."
            );

            return;
        }


        if (!expiryDate) {

            showMessage(
                "Please calculate expiry date first."
            );

            return;
        }


        const data = {

            memberId: memberId,

            trainerId: trainerId,

            planId: planId,

            startDate: startDate,

            expiryDate: expiryDate,

            status: "ACTIVE"
        };


        await apiRequest(
            "/memberships/register",
            {
                method: "POST",

                body: JSON.stringify(data)
            }
        );


        showMessage(
            "Membership registered successfully!"
        );


        document.getElementById(
            "membershipForm"
        ).reset();


        document.getElementById(
            "membershipStatus"
        ).value = "ACTIVE";


        getMemberships();

        loadCounts();


    } catch (error) {

        console.error(error);

    }
}


/* ================================================= */
/* MEMBERSHIPS */
/* ================================================= */

async function getMemberships() {

    try {

        const data =
            await apiRequest("/memberships");

        const container =
            document.getElementById(
                "membershipsList"
            );


        if (!data || data.length === 0) {

            container.innerHTML =
                "<p>No memberships found.</p>";

            return;
        }


        let html = `
            <div class="table-wrapper">
            <table class="data-table">

            <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Trainer</th>
                <th>Plan</th>
                <th>Start Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
            </tr>
        `;


        data.forEach(membership => {

            html += `
                <tr>

                    <td>
                        ${membership.membershipId}
                    </td>

                    <td>
                        ${
                membership.member
                    ? membership.member.memberName
                    : "-"
            }
                    </td>

                    <td>
                        ${
                membership.trainer
                    ? membership.trainer.trainerName
                    : "-"
            }
                    </td>

                    <td>
                        ${
                membership.plan
                    ? membership.plan.planName
                    : "-"
            }
                    </td>

                    <td>
                        ${membership.startDate}
                    </td>

                    <td>
                        ${membership.expiryDate}
                    </td>

                    <td>
                        ${membership.status}
                    </td>

                </tr>
            `;
        });


        html += `
            </table>
            </div>
        `;


        container.innerHTML = html;


    } catch (error) {

        console.error(error);

    }
}


/* ================================================= */
/* TRIGGER */
/* ================================================= */

async function runTrigger() {

    try {

        const id =
            Number(
                document.getElementById(
                    "triggerMembershipId"
                ).value
            );

        const newExpiry =
            document.getElementById(
                "triggerExpiryDate"
            ).value;


        if (!id || !newExpiry) {

            showMessage(
                "Enter Membership ID and new expiry date."
            );

            return;
        }


        const membership =
            await apiRequest(
                `/memberships/${id}`
            );


        const data = {

            member: {
                memberId:
                membership.member.memberId
            },

            trainer: {
                trainerId:
                membership.trainer.trainerId
            },

            plan: {
                planId:
                membership.plan.planId
            },

            startDate:
            membership.startDate,

            expiryDate:
            newExpiry,

            status:
            membership.status
        };


        await apiRequest(
            `/memberships/${id}`,
            {
                method: "PUT",

                body: JSON.stringify(data)
            }
        );


        showMessage(
            "Trigger executed successfully!"
        );


        getMemberships();

        loadCounts();


    } catch (error) {

        console.error(error);

    }
}


/* ================================================= */
/* JOIN */
/* ================================================= */

async function showJoin() {

    try {

        const data =
            await apiRequest(
                "/attendance/join"
            );


        const container =
            document.getElementById(
                "joinResult"
            );


        if (!data || data.length === 0) {

            container.innerHTML =
                "<p>No JOIN data found.</p>";

            return;
        }


        let html = `
            <div class="result-table">

            <table>

                <tr>
                    <th>Member ID</th>
                    <th>Member Name</th>
                    <th>Attendance Date</th>
                    <th>Attendance</th>
                    <th>Membership Start</th>
                    <th>Membership Expiry</th>
                </tr>
        `;


        data.forEach(row => {

            html += `
                <tr>

                    <td>${row[0]}</td>

                    <td>${row[1]}</td>

                    <td>${row[2]}</td>

                    <td>${row[3]}</td>

                    <td>${row[4]}</td>

                    <td>${row[5]}</td>

                </tr>
            `;
        });


        html += `
            </table>
            </div>
        `;


        container.innerHTML = html;


    } catch (error) {

        console.error(error);

    }
}


/* ================================================= */
/* SUBQUERY */
/* ================================================= */

async function showAboveAverage() {

    try {

        const data =
            await apiRequest(
                "/attendance/above-average"
            );


        const container =
            document.getElementById(
                "subqueryResult"
            );


        if (!data || data.length === 0) {

            container.innerHTML =
                "<p>No members are above average.</p>";

            return;
        }


        let html = `
            <div class="result-table">

            <table>

                <tr>
                    <th>Member ID</th>
                    <th>Member Name</th>
                    <th>Attendance Count</th>
                </tr>
        `;


        data.forEach(row => {

            html += `
                <tr>

                    <td>${row[0]}</td>

                    <td>${row[1]}</td>

                    <td>${row[2]}</td>

                </tr>
            `;
        });


        html += `
            </table>
            </div>
        `;


        container.innerHTML = html;


    } catch (error) {

        console.error(error);

    }
}


/* ================================================= */
/* DASHBOARD COUNTS */
/* ================================================= */

async function loadCounts() {

    try {

        const members =
            await apiRequest("/members");

        const trainers =
            await apiRequest("/trainers");

        const plans =
            await apiRequest("/plans");

        const memberships =
            await apiRequest("/memberships");


        document.getElementById(
            "memberCount"
        ).textContent =
            members ? members.length : 0;


        document.getElementById(
            "trainerCount"
        ).textContent =
            trainers ? trainers.length : 0;


        document.getElementById(
            "planCount"
        ).textContent =
            plans ? plans.length : 0;


        document.getElementById(
            "membershipCount"
        ).textContent =
            memberships
                ? memberships.length
                : 0;


    } catch (error) {

        console.error(
            "Dashboard count error:",
            error
        );

    }
}


/* ================================================= */
/* PAGE LOAD */
/* ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* Sidebar */

        document
            .querySelectorAll(".nav-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        openSection(
                            button.dataset.page
                        );

                    }
                );

            });


        /* Member form */

        const memberForm =
            document.getElementById(
                "memberForm"
            );

        if (memberForm) {

            memberForm.addEventListener(
                "submit",
                addMember
            );

        }


        /* Membership form */

        const membershipForm =
            document.getElementById(
                "membershipForm"
            );

        if (membershipForm) {

            membershipForm.addEventListener(
                "submit",
                registerMembership
            );

        }


        /* Dashboard */

        loadCounts();

    }
);