import { useState } from "react";

export default function AddGoal() {
  const [description, setDescription] = useState('');

  const onDescriptionChanged = e => setDescription(e.target.value);

  return (
    <section className="">
      <form>
        <label htmlFor="description">
          Goal:
        </label>

        <input 
          type="text" 
          id="description" 
          name="description"
          value={description}
          onChange={onDescriptionChanged}
          placeholder="What would you like to achieve?"
        />
      </form>
    </section>
  )
}
