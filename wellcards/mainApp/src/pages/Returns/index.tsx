import BreadCrumbs from '../../components/BreadCrumbs'
import ReturnsSearch from './ReturnsSearch'
import AllReturns from './AllReturns'

export default function Returns() {
  return (
    <div className='returns-page'>
      <BreadCrumbs mainPage='Cards' currentPage='Transactions'/>
      <ReturnsSearch/>
      <AllReturns/>
    </div>
  )
}
