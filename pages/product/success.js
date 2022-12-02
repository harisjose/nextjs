import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBadgeCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function () {

    return (
        <article class="bg-gray-100 grid h-screen place-items-center w-full shadow rounded-xl">
            <section class="bg-white p-6">
                <FontAwesomeIcon icon={faCheckCircle} className="text-center"/>
                <div class="text-center">
                    <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                    <p class="text-gray-600 my-2">Thank you for your purchase and product is on its way.</p>
                    <p> Have a great day!  </p>
                    <div class="py-10 text-center">
                        <a href="/" class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            GO BACK 
                    </a>
                    </div>
                </div>
            </section>
        </article>
    )
}