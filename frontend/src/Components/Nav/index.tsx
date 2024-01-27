import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { setUserId } from "../../features/auth/authSlice";
import { deleteRequest } from "../../utils";
import { useAppDispatch } from "../../app/hooks";

export default function Nav() {
    const dispatch = useAppDispatch();

    async function handleLogout() {
        try {
            const response = await deleteRequest("/auth/logout");
            console.log(response);

            dispatch(setUserId(""));
            localStorage.removeItem("userId");
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteAccount() {
        try {
            const response = await deleteRequest("/account");
            console.log(response);

            dispatch(setUserId(""));
            localStorage.removeItem("userId");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
                <img
                    src="/favicon.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite React Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Flowbite React
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">
                            name@flowbite.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>External accounts</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                        Log out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="#" active>
                    Dashboard
                </Navbar.Link>
                <Navbar.Link href="#">Transactions</Navbar.Link>
                <Navbar.Link href="#">Planning</Navbar.Link>
                <Navbar.Link href="#">Calculators</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
