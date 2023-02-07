import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode
}

const Layout = ({children, ...rest}:LayoutProps) => {
    return(
        <div {...rest}>
            {children}
        </div>
    )
}

export default Layout