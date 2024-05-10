import React from "react";
import { toast } from "react-toastify";

function About() {
  return (
    <div className="py-10">
      <h1 className="w-full text-center text-3xl font-extrabold">
        We Love{" "}
        <span
          onClick={() => {
            toast.success("You clicked me 😜");
          }}
          className="btn btn-primary text-3xl items-center mb-10"
        >
          Comfy
        </span>
      </h1>
      <p className="italic">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
        autem odit voluptatibus rerum, maiores aliquam deleniti reiciendis.
        Doloribus fugit explicabo quae, ipsa nostrum quia saepe dolores error
        iusto adipisci delectus incidunt iure perspiciatis hic sunt similique
        reprehenderit odit minima iste porro reiciendis quod, sint dolorem?
        Soluta numquam provident explicabo, enim temporibus placeat optio,
        nesciunt nisi alias rem modi illum corrupti repellat magni facilis,
        ipsum neque odio dolorum voluptas? Quaerat explicabo est corporis
        asperiores ab libero saepe. Obcaecati unde, aliquid iusto ab esse velit.
        Veniam odio beatae quam, minus id maiores. Rem voluptate doloribus fuga
        quaerat tempore aperiam illum et voluptatum!
      </p>
    </div>
  );
}

export default About;
