import { MobileStores, DesktopStores } from "./components/stores"

export default function Store() {
    return (
        <section className="px-3">
            <MobileStores />
            <DesktopStores />
        </section>
    )
}