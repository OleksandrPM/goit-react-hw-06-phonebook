import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';
import { getFilter } from 'redux/filter/selectors';
import css from './Filter.module.css';

export default function Filter() {
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const onChange = event => {
    sendFilter(event.target.value);
  };

  const sendFilter = value => {
    dispatch(setFilter(value));
  };

  return (
    <div className={css.filter}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={filter}
        onChange={onChange}
        className={css.filter__input}
      ></input>
    </div>
  );
}
