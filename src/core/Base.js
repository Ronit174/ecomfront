import React from 'react';
import Menu from './Menu';


const Base = ({
    title = "GibboCart",
    description ="My description",
    className=" text-black p-4",
    children
}) => {
    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbtron text-black text-center">
                    <h2 className="display-4">
                        {title}
                    </h2>
                    <p className="lead">
                        {description}
                    </p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer mt-auto py-3">
            <div className="container-fluid bg-dark text-white text-center py-3">
                <h4>If you get any questions feel free to contact us</h4>
                <button className="btn btn-info btn-lg">Contact Us</button> 
            </div>
            <div className="container">
                <span className="text-muted">
                    T-shirts which defines you 👕  
                </span>

            </div>
          </footer>  
        </div>
    )
}

export default Base;
