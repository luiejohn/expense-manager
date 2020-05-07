import React from 'react'
import style from './Navigation.module.scss'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className="navBar_cont">
            Expense Manager

            <div className={style.nav}>
                <Link to="/">
                    Home
                </Link>
                <Link to="/expenses">
                    Expenses
                </Link>
            </div>
      </div>
    )
}

export default Navigation