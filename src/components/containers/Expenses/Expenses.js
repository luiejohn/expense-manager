import React, { Component } from 'react'
import style from './Expenses.module.scss'
import Modal from './../../common/Modal/Modal';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { categories } from './../../../config';
import svgIcon from '../../../assets/icons/sprite.svg'

class Expenses extends Component {

    constructor(props) {
        super(props);
        this.state = {
          expenses: [],
          searchKey: "",
          searchItems: [],
          title:"",
          amount: 0,
          date:"",
          category: "Choose Category",
          note: "",
          expand: true,
          isModal: false
        }
    }
      
    handleAddExpense = () => {
        const { amount, date, category, note, expenses, title, isModal } = this.state

        const copyExp = [ ...expenses]
        const newExp = {
            id: expenses.length,
            title,
            amount,
            date,
            category,
            note
        }

        copyExp.push(newExp)

        this.setState({    
            expenses: copyExp,
            isModal: !isModal,
            title: "",
            amount: 0,
            date:"",
            category: "Choose Category",
            note: "",
        })

    }

    handleDeleteExpense = (id) => {

        const { expenses } = this.state

        const newArr = expenses.filter( item => {
           return id !== item.id
        })

        this.setState({
            expenses: newArr
        })

    }

    handleChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }

    handleModal = () => {
        const { isModal } = this.state

        this.setState({
            isModal: !isModal
        })
    }

    handleSearchItems = () =>  {
        const { searchKey } = this.state
    }

    render() {
        const { isModal, date, category, expand,expenses, searchKey } = this.state
        
        let searchedItems = [] 
        if(searchKey) {
            searchedItems = expenses.filter( item => {
                return item.title.toLowerCase().includes(searchKey.toLowerCase())
            })
        } else {
            searchedItems = [...expenses]
        }

        return (
            <div className={style.container}>
                <div className={style.exp_nav}>
                    <div>Expense List</div>
                    <input className={style.search} type="text" placeholder="Search by Title" onChange={(e) => this.handleChange("searchKey", e.target.value)}/>
                    <div onClick={this.handleModal} className={style.add_btn}>
                        <div className={style.add_btn_text}>
                            Add New
                        </div>
                        <svg className={style.add_btn_svg}>
                            <use xlinkHref={`${svgIcon}#icon-plus`}></use>
                        </svg>
                    </div>
                </div>
    
                <div className={ searchedItems.length === 0 ? style.list_cont_flex : style.list_cont}>

                    {
                        searchedItems.length === 0 ? 
                                    <div className={style.empty_placeholder}>
                                        <svg>
                                            <use xlinkHref={`${svgIcon}#icon-wondering`}></use>
                                        </svg>
                                        Your list is empty
                                    </div>

                                    :  searchedItems.map( expense => {
                                        console.log(expense)
                                        return(
                                            <div key={expense.id} className={style.list_item}>
                                                <div className={style.list_item_icon}>
                                                    <svg className={style.list_item_icon_svg}>
                                                        <use xlinkHref={`${svgIcon}#icon-clipboard`}></use>
                                                    </svg>
                                                </div>
                                                <div className={style.list_item_desc}>
                                                    <div className={style.list_item_title}>{expense.title}</div>
                                                    <div>{expense.date.toLocaleDateString()} - {expense.category}</div>
                                                </div>
                                                <div className={style.list_item_price}>
                                                    $ {expense.amount}
                                                </div>
                                                <div onClick={()=>this.handleDeleteExpense(expense.id)}
                                                    className={style.list_item_delete}
                                                >
                                                    <svg className={style.list_item_icon_svg}>
                                                        <use xlinkHref={`${svgIcon}#icon-trash`}></use>
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    })
                    }

                </div>

                <Modal handleModal={this.handleModal} 
                    isModal={isModal}
                    handleChange={this.handleChange}
                    handleAddExpense={this.handleAddExpense}
                >
                    <div className={style.input_section}>
                        <div className={style.input_section_label}>Title</div>
                        <div className={style.input_section_input}>
                            <input type="text" onChange={ e => this.handleChange("title", e.target.value)}    
                            />
                        </div>

                    </div>
                    <div className={style.input_section}>
                        <div className={style.input_section_label}>Amount</div>
                        <div className={style.input_section_input}>
                            <input type="number" onChange={ e => this.handleChange("amount", e.target.value)}    
                            />
                        </div>
                    </div>
                    
                    <div className={style.heading}>
                        <h4>Settings</h4>
                    </div>
                    
                    <div className={style.input_section}>
                        <div className={style.input_section_label}>Category</div>
                        <div className={style.input_section_input}>
                        <div onClick={()=> this.handleChange("expand", !expand)} className={style.category_handle}>
                            { category }
                        </div>
                        </div>
                    </div>
                    <div className={ style.category_items }>
                        {
                            categories.map( cat => {
                                return (
                                    <div key={cat.id} onClick={() => this.handleChange("category", cat.title)}
                                        className={ category === cat.title ? `${style.category_item} ${style.cat_selected}` : style.category_item}
                                    >
                                        {cat.title}
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className={style.input_section}>
                        <div className={style.input_section_label}>Date</div>
                        <div className={style.input_section_input}>
                            <DatePicker selected={date}  onChange={date => this.handleChange("date", date)} />
                        </div>
                    </div>
                    <div className={style.input_section_notes}>
                        <div className={style.input_section_noteslabel}>
                            Notes
                        </div>
                        <textarea rows={3} onChange={ e => this.handleChange("note", e.target.value)}>

                        </textarea>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default Expenses