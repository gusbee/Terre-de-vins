<?php

namespace App\Repository;

use App\Entity\Degustation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Degustation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Degustation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Degustation[]    findAll()
 * @method Degustation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DegustationRepository extends ServiceEntityRepository
{
    /** @var EntityManagerInterface  */
    private $entityManager;

    public function __construct(ManagerRegistry $registry,EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Degustation::class);
        $this->entityManager = $entityManager;
    }

    /**
     * @param $value
     * @return bool
     *
     * Description :
     * Récupère tous les degustations par leurs id et return true si la degustation n'existe pas
     */
    public function findDegustationByTitle($value){

        $doctrine = $this->entityManager;

        /**  Récupére les degustations par leur titre */
        $degustation = $doctrine
            ->getRepository(Degustation::class)
            ->findOneBy(['title' => $value]);

        /** si la degustation n'existe pas, retourne faux sinon vrai*/
        if (is_null($degustation)) {
            return False;
        }
        else{
            return True;
        }
    }
}
