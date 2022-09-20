import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Contexts
import { Searching } from "src/contexts";

// Services
import services from "src/services";

type SearchData = {
  name: string;
  currentPage: number;
};

const Search = () => {
  const { handleSubmit, register, formState } = useForm<SearchData>({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const { setSearching, currentPage } = useContext(Searching.Context);

  const onSubmit: SubmitHandler<SearchData> = async (data: SearchData) => {
    const { name } = data;

    const newSearching = await services.getUsers({ name, currentPage });
    newSearching && setSearching({ ...newSearching });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input
          {...register("name", {
            required: true,
            minLength: 1,
          })}
          placeholder="Pesquisar um usuário"
          type="text"
        />
      </label>
      <button type="submit" disabled={!formState.isValid}>
        Submit
      </button>
    </form>
  );
};

export default Search;
